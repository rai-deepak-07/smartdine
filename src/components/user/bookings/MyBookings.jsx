import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MyBookings = () => {
  const data = [
    { id: 1, name: "The Culinary Haven", date: "2024-12-25", time: "10:30 AM - 12:30 PM", table: 5, status: "Confirmed", address: "123 Gourmet Street, New York", guests: 4, img: "https://picsum.photos/seed/culinary/300/200.jpg", city: "New York" }
  ];

  const [map, setMap] = useState({});
  const colors = { Confirmed: "success", Pending: "warning", Booked: "secondary" };
  const past = d => new Date(d) < new Date().setHours(0,0,0,0);
  const fmt = d => new Date(d).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  const upcoming = data.filter(b => !past(b.date));
  const previous = data.filter(b => past(b.date));

  const Card = ({ b, old }) => (
    <div className="col-12 mb-3">
      <div className={`card ${old ? 'opacity-75' : ''}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={b.img} className="img-fluid rounded-start h-100 object-fit-cover" alt={b.name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5>{b.name}</h5>
                <span className={`badge bg-${colors[b.status]}`}>{b.status}</span>
              </div>
              <div className="row mb-3">
                <div className="col-6"><strong>Date:</strong> {fmt(b.date)}</div>
                <div className="col-6"><strong>Time:</strong> {b.time}</div>
                <div className="col-6"><strong>Table:</strong> {b.table}</div>
                <div className="col-6"><strong>Guests:</strong> {b.guests}</div>
                <div className="col-12"><strong>City:</strong> {b.city}</div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setMap(b)} title="View on map">📍</button>
                <button className="btn btn-primary btn-sm">Pre Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">My Bookings</h1>
      
      {data.length === 0 ? (
        <div className="card text-center p-5">
          <h3>No bookings yet</h3>
          <p className="mb-4">Book a table to get started!</p>
          <button className="btn btn-primary">Make a Booking</button>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-4 text-primary">📅 Upcoming ({upcoming.length})</h3>
              <div className="row">{upcoming.map(b => <Card key={b.id} b={b} old={false} />)}</div>
            </div>
          )}
          {previous.length > 0 && (
            <div>
              <h3 className="mb-4 text-muted">⏰ Previous ({previous.length})</h3>
              <div className="alert alert-info mb-4">Past bookings marked as "Booked"</div>
              <div className="row">{previous.map(b => <Card key={b.id} b={b} old={true} />)}</div>
            </div>
          )}
        </>
      )}
      
      {map && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📍 Location</h5>
                <button type="button" className="btn-close" onClick={() => setMap(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3"><strong>Restaurant:</strong> {map.name}</div>
                <div className="mb-3"><strong>Address:</strong> {map.address}</div>
                <div className="ratio ratio-16x9">
                  <iframe src={`https://maps.google.com/maps?q=${encodeURIComponent(map.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} title="Map" frameBorder="0" allowFullScreen></iframe>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setMap(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;