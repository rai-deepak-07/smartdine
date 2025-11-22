import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { UserContext } from '../../../context/Context';

const Card = ({ children, className = "" }) => <div className={`card ${className}`}>{children}</div>;
const CardBody = ({ children }) => <div className="card-body">{children}</div>;
const Badge = ({ children, type = "light" }) => <span className={`badge bg-${type}`}>{children}</span>;

const Bookings = () => {
  const { id } = useParams();
  const {
    restaurantData,
    fetchRestaurantDetails,
    restaurantTables,
    fetchRestaurantTables,
    fetchBookingsForDateTime,
    createTableBooking
  } = useContext(UserContext);

  const [days] = useState(() => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Use local timezone for date formatting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const fullDate = `${year}-${month}-${day}`; // YYYY-MM-DD in local timezone
    
    return {
      id: i,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: fullDate, // Now uses local timezone
      isToday: i === 0
    };
  });
});

  const [state, setState] = useState({
    day: days[0],
    slot: null,
    guestOption: "2",
    customGuests: "",
    waiting: false,
    details: null,
    slots: [],
    availableTables: [],
    selectedTable: null,
    existingBookings: []
  });

  // Fetch restaurant details and tables on mount
  // useEffect(() => {
  // }, [id]);
  
 // Reset state and fetch data when restaurant changes
useEffect(() => {
  if (!id) return; // Don't fetch if no ID
  
  console.log('Restaurant ID changed to:', id);
  
  // Fetch restaurant details and tables
  fetchRestaurantDetails(id);
  fetchRestaurantTables(id);
  
  // Reset state
  setState(prev => ({
    ...prev,
    slots: [],
    availableTables: [],
    selectedTable: null,
    slot: null,
    existingBookings: []
  }));
}, [id]);



 // Generate time slots based on restaurant hours
useEffect(() => {
  if (!restaurantData.opening_time || !restaurantData.closing_time) return;

  const [openH, openM] = restaurantData.opening_time.split(':').map(Number);
  const [closeH, closeM] = restaurantData.closing_time.split(':').map(Number);

  // Start time: 30 minutes after opening
  let startH = openH;
  let startM = openM + 30;
  if (startM >= 60) {
    startH++;
    startM -= 60;
  }

  // Calculate the latest slot start time
  let lastSlotStartH = closeH - 4;
  let lastSlotStartM = closeM;
  
  if (lastSlotStartH < 0) {
    lastSlotStartH += 24;
  }

  const now = new Date();
  const curH = now.getHours();
  const curM = now.getMinutes();

  const slots = [];

  // Generate slots until we reach the last valid start time
  while (startH < lastSlotStartH || (startH === lastSlotStartH && startM <= lastSlotStartM)) {
    const start = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
    const slotEndH = startH + 2;
    const slotEndM = startM;
    const end = `${slotEndH.toString().padStart(2, '0')}:${slotEndM.toString().padStart(2, '0')}`;

    // Check if slot is in the past
    const isPast = state.day.isToday && (startH < curH || (startH === curH && startM <= curM));

    // Only add future slots for today, or all slots for future days
    if (!isPast) {
      slots.push({
        id: `${startH}-${startM}`,
        start,
        range: `${start} - ${end}`,
        past: false
      });
    }

    startM += 30;
    if (startM >= 60) {
      startH++;
      startM -= 60;
    }
  }

  setState(prev => ({
    ...prev,
    slots,
    slot: null,
    availableTables: [],
    selectedTable: null,
    existingBookings: []
  }));
}, [state.day, restaurantData]);


// Fetch existing bookings and calculate available tables when slot is selected
useEffect(() => {
  if (state.slot && restaurantTables.length > 0) {
    const selectedSlot = state.slots.find(s => s.id === state.slot);
    if (!selectedSlot) return;

    // Calculate end time for selected slot (2 hours later)
    const [startH, startM] = selectedSlot.start.split(':').map(Number);
    const endH = startH + 2;
    const selectedStartTime = selectedSlot.start;
    const selectedEndTime = `${endH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;

    console.log('🔍 Checking availability for slot:', selectedStartTime, '-', selectedEndTime);

    // Fetch ALL bookings for this date AND restaurant
    fetchBookingsForDateTime(id, state.day.fullDate)
      .then(bookings => {
        console.log('📋 All bookings for date:', bookings);
        
        setState(prev => ({ ...prev, existingBookings: bookings }));

        // Get guest count
        const guestCount = state.guestOption === "other"
          ? parseInt(state.customGuests) || 2
          : parseInt(state.guestOption);

        // Function to check if two time ranges overlap
        const timesOverlap = (start1, end1, start2, end2) => {
          const toMinutes = (time) => {
            const [h, m] = time.split(':').map(Number);
            return h * 60 + m;
          };
          
          const s1 = toMinutes(start1);
          const e1 = toMinutes(end1);
          const s2 = toMinutes(start2);
          const e2 = toMinutes(end2);
          
          // Overlap: selected starts before existing ends AND selected ends after existing starts
          return s1 < e2 && e1 > s2;
        };

        // Get booked table IDs for overlapping time slots
        const bookedTableIds = bookings
          .filter(booking => {
            // Skip cancelled bookings
            if (booking.status === 'cancelled') return false;
            
            // Extract time portion (handle both HH:MM:SS and HH:MM formats)
            const bookingStart = booking.booking_time.substring(0, 5); // HH:MM
            const bookingEnd = booking.booking_end_time.substring(0, 5); // HH:MM
            
            // Check if booking overlaps with selected slot
            const overlaps = timesOverlap(
              selectedStartTime,
              selectedEndTime,
              bookingStart,
              bookingEnd
            );
            
            if (overlaps) {
              console.log('⚠️ Overlap found:', {
                table: booking.table_detail?.table_number,
                tableId: booking.table_detail?.id,
                bookingTime: `${bookingStart} - ${bookingEnd}`,
                selectedTime: `${selectedStartTime} - ${selectedEndTime}`
              });
            }
            
            return overlaps;
          })
          .map(b => b.table_detail?.id)  // ✅ FIXED: Use table_detail.id
          .filter(id => id !== undefined); // ✅ Remove any undefined values

        console.log('🚫 Booked table IDs:', bookedTableIds);

        // Filter available tables
        const availableTables = restaurantTables
          .filter(table =>
            table.capacity >= guestCount && // Must fit guests
            !bookedTableIds.includes(table.id) // Must not be booked in overlapping slot
          )
          .map(table => ({ ...table, available: true }));

        console.log('✅ Available tables:', availableTables.map(t => `Table ${t.table_number} (ID: ${t.id})`));

        setState(prev => ({
          ...prev,
          availableTables,
          selectedTable: null
        }));
      })
      .catch(err => {
        console.error("Error fetching bookings:", err);
        setState(prev => ({ ...prev, availableTables: [], selectedTable: null }));
      });
  }
}, [state.slot, state.guestOption, state.customGuests, restaurantTables, id, state.day.fullDate]);

  const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));

  const handleBooking = async (e) => {
  e.preventDefault();

  // Validations
  if (!state.slot) {
    alert("Please select a time slot");
    return;
  }

  if (!state.selectedTable) {
    alert("Please select a table");
    return;
  }

  if (state.guestOption === "other" && (!state.customGuests || parseInt(state.customGuests) < 1)) {
    alert("Please enter valid guest number");
    return;
  }

  // Get user ID from localStorage (or context)
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    alert("Please login to book a table");
    return;
  }

  const slot = state.slots.find(s => s.id === state.slot);
  const table = state.availableTables.find(t => t.id === state.selectedTable);
  
  // Calculate end time (2 hours after start)
  const [startH, startM] = slot.start.split(':').map(Number);
  const endH = startH + 2;
  const endTime = `${endH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}:00`;

  // Prepare booking data matching your Django model
  const bookingData = {
    restaurant: id, // Restaurant ID from URL params
    user: userId, // User ID from localStorage
    table: table.id, // Table ID
    booking_date: state.day.fullDate, // YYYY-MM-DD
    booking_time: `${slot.start}:00`, // HH:MM:SS format
    booking_end_time: endTime, // Auto-calculated but can be sent
    status: 'booked',
    number_of_guests: state.guestOption === "other" ? parseInt(state.customGuests) : parseInt(state.guestOption),
    checked_in: false
  };

  console.log('Creating booking:', bookingData);

  // Call API to create booking
  const result = await createTableBooking(bookingData);

  if (result.success) {
    // Show success message
    updateState({
      details: {
        id: result.data.id,
        date: state.day.fullDate,
        time: slot.range,
        guests: bookingData.number_of_guests,
        table: table.table_number,
        bookingData: result.data
      },
      waiting: true,
      slot: null,
      selectedTable: null,
      availableTables: [],
      guestOption: "2",
      customGuests: "",
      existingBookings: []
    });

    // Show success alert
    alert('Table booked successfully! Booking ID: ' + result.data.id);
  } else {
    // Show error message
    alert('Failed to book table: ' + JSON.stringify(result.error));
  }
};


  return (
    <div className="container my-5">
      <h3><i className="bi bi-table me-2"></i>Table Booking</h3>
      <hr />
      <div className="row">
        {/* Restaurant Details */}
        <div className="col-md-5 mb-4">
          <Card>
            <img
              src={restaurantData.restaurant_image || "https://via.placeholder.com/600x400"}
              className="card-img-top"
              alt={restaurantData.res_name}
            />
            <CardBody>
              <h4>{restaurantData.res_name || "Loading..."}</h4>
              <div className="d-flex align-items-center mb-2">
                <Badge type="warning text-dark" className="me-2">★ 4.3</Badge>
                <span className="text-muted ms-2">(100 reviews)</span>
              </div>
              <div className="mb-2"><Badge type="secondary">Indian</Badge></div>

              <hr />

              <div className="mb-3 p-3 bg-light rounded">
                <h6 className="mb-1 fw-semibold">Opening Hours</h6>
                {restaurantData.opening_time && restaurantData.closing_time && (
                  <>
                    <div className="fw-semibold">
                      {new Date(`1970-01-01T${restaurantData.opening_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                      {new Date(`1970-01-01T${restaurantData.closing_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="small text-muted mt-1">
                      First slot: 30 min after opening<br />
                      Last slot: 2 hours before closing
                    </div>
                  </>
                )}
              </div>

              <div className="mb-2">
                <a href={restaurantData.google_location_url} className="text-decoration-none text-dark" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                  {restaurantData.res_address}
                </a>
              </div>
              <div className="mb-2">
                <a href={`tel:${restaurantData.res_contact_no}`} className="text-decoration-none text-dark">
                  <i className="bi bi-telephone text-primary me-2"></i>
                  {restaurantData.res_contact_no}
                </a>
              </div>
              <div className="mb-2">
                <a href={`mailto:${restaurantData.email}`} className="text-decoration-none text-dark">
                  <i className="bi bi-envelope text-primary me-2"></i>
                  {restaurantData.email}
                </a>
              </div>
            </CardBody>
          </Card>

          {/* Booking Confirmation */}
          {state.waiting && state.details && (
            <Card className="mt-3 border-success">
              <CardBody className="bg-success bg-opacity-10">
                <h5 className="card-title text-success">✓ Booking Successful</h5>
                <div className="mb-2"><strong>Booking ID:</strong> #{state.details.id}</div>
                <div className="mb-2"><strong>Date:</strong> {new Date(state.details.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="mb-2"><strong>Time:</strong> {state.details.time}</div>
                <div className="mb-2"><strong>Guests:</strong> {state.details.guests}</div>
                <div className="mb-2"><strong>Table:</strong> {state.details.table}</div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Booking Form */}
        <div className="col-md-7">
          <Card>
            <CardBody>
              <h5 className="mb-4">Select Date & Time</h5>

              {/* Date Selection */}
              <div className="mb-4">
                <div className="d-flex overflow-auto">
                  {days.map(d => (
                    <div
                      key={d.id}
                      className={`text-center p-3 mx-1 rounded cursor-pointer ${state.day.id === d.id ? 'bg-primary text-white' : 'bg-light'
                        } ${d.isToday ? 'border border-primary' : ''}`}
                      onClick={() => updateState({ day: d })}
                      style={{ minWidth: '90px', cursor: 'pointer' }}
                    >
                      <div className="fw-bold">{d.dayName}</div>
                      <div className="fs-4 fw-semibold">{d.dayNumber}</div>
                      <div>{d.month}</div>
                      {d.isToday && <div className="small">Today</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="mb-4">
                <h5 className="mb-3">Select Time Slot (2 hours)</h5>
                {state.day.isToday && (
                  <div className="alert alert-info py-2 mb-3">
                    <small>ℹ️ Past slots unavailable</small>
                  </div>
                )}

                <select
                  className="form-select"
                  value={state.slot || ""}
                  onChange={(e) => updateState({ slot: e.target.value })}
                  disabled={state.slots.length === 0}
                >
                  <option value="" disabled>Select a time slot</option>
                  {state.slots.filter(s => !s.past).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.range}
                    </option>
                  ))}
                </select>
                {state.slots.length > 0 && (
                  <small className="text-muted mt-2 d-block">
                    Available slots: {state.slots.filter(s => !s.past).length}
                  </small>
                )}
              </div>

              {/* Guest Selection */}
              <div className="mb-4">
                <h5 className="mb-3">Number of Guests</h5>
                <div className="row">
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={state.guestOption}
                      onChange={(e) => updateState({ guestOption: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {state.guestOption === "other" && (
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Number of guests"
                        value={state.customGuests}
                        onChange={(e) => updateState({ customGuests: e.target.value })}
                        min="1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Table Selection */}
              {state.slot && (
                <div className="mb-4">
                  <h5 className="mb-3">Select a Table</h5>
                  {state.availableTables.length === 0 ? (
                    <div className="alert alert-warning">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      No tables available for this time slot with {state.guestOption === "other" ? state.customGuests : state.guestOption} guest(s).
                    </div>
                  ) : (
                    <div className="row g-2">
                      {state.availableTables.map(table => (
                        <div key={table.id} className="col-6 col-md-4">
                          <div
                            className={`p-3 text-center rounded ${state.selectedTable === table.id ? 'bg-success text-white' : 'bg-light border'
                              }`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => updateState({ selectedTable: table.id })}
                          >
                            <div className="fw-bold">Table {table.table_number}</div>
                            <div className="small">Capacity: {table.capacity}</div>
                            <div className="small text-success">✓ Available</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Book Button */}
              <form onSubmit={handleBooking}>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={!state.slot || !state.selectedTable}
                >
                  Book Table
                </button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
