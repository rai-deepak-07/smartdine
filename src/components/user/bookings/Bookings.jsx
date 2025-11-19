import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Bookings = () => {
  const data = {
    restaurant: {
      name: "The Culinary Haven",
      image: "https://picsum.photos/seed/restaurant/600/400.jpg",
      cuisine: "Italian & Mediterranean",
      rating: 4.8,
      reviews: 324,
      address: "123 Gourmet Street, Foodie District",
      phone: "+1 (555) 123-4567",
      email: "reservations@culinaryhaven.com",
      hours: { open: "10:00", close: "22:00" }
    },
    booking: {
      guests: [1,2,3,4,5,6],
      day: null,
      slot: null,
      guestOption: "2",
      customGuests: "",
      waiting: false,
      details: null
    }
  };

  const [days] = useState(() => {
    const d = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      d.push({
        id: i,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date.toISOString().split('T')[0],
        isToday: i === 0
      });
    }
    return d;
  });

  const [state, setState] = useState({
    ...data.booking,
    day: days[0],
    slots: []
  });

  useEffect(() => {
    const { restaurant } = data;
    const [openH, openM] = restaurant.hours.open.split(':').map(Number);
    const [closeH] = restaurant.hours.close.split(':').map(Number);
    let startH = openH, startM = openM + 30;
    if (startM >= 60) { startH++; startM -= 60; }
    const endH = closeH - 2;
    const now = new Date();
    const curH = now.getHours(), curM = now.getMinutes();
    
    const slots = [];
    while (startH < endH || (startH === endH && startM <= 0)) {
      const start = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
      const end = `${(startH + 2).toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
      const isPast = state.day.isToday && (startH < curH || (startH === curH && startM < curM));
      
      slots.push({
        id: `${startH}-${startM}`,
        start,
        range: `${start} - ${end}`,
        past: isPast
      });
      
      startM += 30;
      if (startM >= 60) { startH++; startM -= 60; }
    }
    
    setState(prev => ({ ...prev, slots, slot: null }));
  }, [state.day]);

  const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));

  const book = (e) => {
    e.preventDefault();
    if (state.slot === null) return alert("Please select a time slot");
    if (state.guestOption === "other" && (!state.customGuests || parseInt(state.customGuests) < 1)) {
      return alert("Please enter valid guest number");
    }
    
    const slot = state.slots.find(s => s.id === state.slot);
    updateState({
      details: {
        id: Math.floor(Math.random() * 10000),
        date: state.day.fullDate,
        time: slot.range,
        guests: state.guestOption === "other" ? state.customGuests : state.guestOption
      },
      waiting: true,
      slot: null,
      guestOption: "2",
      customGuests: ""
    });
  };

  const { restaurant } = data;

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Book a Table</h1>
      
      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="card">
            <img src={restaurant.image} className="card-img-top" alt={restaurant.name} />
            <div className="card-body">
              <h2>{restaurant.name}</h2>
              <div className="d-flex align-items-center mb-2">
                <span className="badge bg-warning text-dark me-2">{restaurant.rating}</span>
                <span className="text-muted">({restaurant.reviews} reviews)</span>
              </div>
              <div className="mb-2">
                <span className="badge bg-light text-dark">{restaurant.cuisine}</span>
              </div>
              <hr />
              <div className="mb-3 p-2 bg-light rounded">
                <h6 className="mb-1">Hours</h6>
                <div className="fw-bold">{restaurant.hours.open} - {restaurant.hours.close}</div>
              </div>
              <div className="mb-2">📍 {restaurant.address}</div>
              <div className="mb-2">📞 {restaurant.phone}</div>
              <div className="mb-2">✉️ {restaurant.email}</div>
            </div>
          </div>
          
          {/* Waiting Status Section */}
          {state.waiting && state.details && (
            <div className="card mt-3 border-warning">
              <div className="card-body bg-warning bg-opacity-10">
                <h5 className="card-title text-warning">
                  ⏳ Booking in Process
                </h5>
                <div className="mb-2">
                  <strong>Booking ID:</strong> #{state.details.id}
                </div>
                <div className="mb-2">
                  <strong>Date:</strong> {new Date(state.details.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="mb-2">
                  <strong>Time:</strong> {state.details.time}
                </div>
                <div className="mb-2">
                  <strong>Guests:</strong> {state.details.guests}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4">Select Date & Time</h3>
              
              <div className="mb-4">
                <div className="d-flex overflow-auto">
                  {days.map(d => (
                    <div
                      key={d.id}
                      className={`text-center p-3 mx-1 rounded cursor-pointer ${
                        state.day.id === d.id ? 'bg-primary text-white' : 'bg-light'
                      } ${d.isToday ? 'border border-primary' : ''}`}
                      onClick={() => updateState({ day: d })}
                      style={{ minWidth: '80px', cursor: 'pointer' }}
                    >
                      <div className="fw-bold">{d.dayName}</div>
                      <div className="fs-4">{d.dayNumber}</div>
                      <div>{d.month}</div>
                      {d.isToday && <div className="small">Today</div>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="mb-3">Time Slots (2 hours)</h5>
                {state.day.isToday && (
                  <div className="alert alert-info py-2 mb-3">
                    <small>ℹ️ Past slots unavailable</small>
                  </div>
                )}
                <div className="row g-2">
                  {state.slots.map(s => (
                    <div key={s.id} className="col-6 col-md-4">
                      <div
                        className={`p-3 text-center rounded ${
                          state.slot === s.id
                            ? 'bg-primary text-white'
                            : s.past
                            ? 'bg-light text-muted border'
                            : 'bg-light border'
                        }`}
                        style={{
                          cursor: !s.past ? 'pointer' : 'not-allowed',
                          opacity: !s.past ? 1 : 0.6
                        }}
                        onClick={() => !s.past && updateState({ slot: s.id })}
                      >
                        {s.start}
                        {s.past && <div className="small text-danger">Past</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <form onSubmit={book}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <select 
                      className="form-select" 
                      value={state.guestOption} 
                      onChange={(e) => updateState({ guestOption: e.target.value })}
                    >
                      {data.booking.guests.map(n => (
                        <option key={n} value={n}>Guest {n}</option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-primary w-100">Book Table</button>
                  </div>
                </div>
                
                {state.guestOption === "other" && (
                  <div className="row mb-3">
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
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;