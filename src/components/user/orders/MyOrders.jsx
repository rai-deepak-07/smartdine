import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// JSON configuration
const CONFIG = {
  tables: {
    1: "Standard", 2: "Standard", 3: "Standard", 4: "Standard",
    5: "Booth", 6: "Booth", 7: "Private", 8: "Private"
  },
  orders: [
    { id: 1001, date: "2023-06-15", time: "18:00 - 20:00", guests: 4, table: 3, status: "confirmed" },
    { id: 1002, date: "2023-06-18", time: "19:30 - 21:30", guests: 2, table: 1, status: "confirmed" },
    { id: 1003, date: "2023-06-20", time: "13:00 - 15:00", guests: 6, table: 5, status: "pending" },
    { id: 987, date: "2023-05-20", time: "19:00 - 21:00", guests: 4, table: 3, status: "completed" },
    { id: 976, date: "2023-05-12", time: "18:30 - 20:30", guests: 2, table: 2, status: "completed" },
    { id: 965, date: "2023-05-05", time: "20:00 - 22:00", guests: 8, table: 7, status: "completed" }
  ],
  statusColors: {
    confirmed: "success",
    pending: "warning",
    completed: "info",
    cancelled: "danger"
  },
  actions: {
    cancel: { icon: "✕", text: "Cancel", class: "danger" },
    preOrder: { icon: "📋", text: "Pre Order", class: "primary" },
    bookAgain: { icon: "↻", text: "Book Again", class: "success" }
  }
};

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    setTimeout(() => setOrders(CONFIG.orders), 500);
  }, []);
  
  const today = new Date().setHours(0, 0, 0, 0);
  const currentOrders = orders.filter(o => new Date(o.date) >= today);
  const pastOrders = orders.filter(o => new Date(o.date) < today);
  const displayOrders = activeTab === "current" ? currentOrders : pastOrders;
  
  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });
  
  const handleAction = (action, order) => {
    if (action === 'cancel' && window.confirm("Cancel this order?")) {
      setOrders(prev => prev.map(o => 
        o.id === order.id ? { ...o, status: 'cancelled' } : o
      ));
      alert("Order cancelled successfully");
    } else if (action === 'preOrder') {
      alert(`Pre-ordering for order #${order.id}`);
    } else if (action === 'bookAgain') {
      alert(`Booking again for ${order.guests} guests`);
    }
  };
  
  const ActionButton = ({ action, order }) => {
    const config = CONFIG.actions[action];
    return (
      <button 
        className={`btn btn-sm btn-outline-${config.class} me-1`}
        onClick={() => handleAction(action, order)}
        title={config.text}
      >
        <span>{config.icon}</span>
        <span className="d-none d-md-inline ms-1">{config.text}</span>
      </button>
    );
  };
  
  return (
    <div className="container my-5">
      <div className="mb-4">
        <h2>My Orders</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Current", value: currentOrders.length, color: "primary" },
          { label: "Confirmed", value: currentOrders.filter(o => o.status === "confirmed").length, color: "success" },
          { label: "Pending", value: currentOrders.filter(o => o.status === "pending").length, color: "warning" },
          { label: "Past", value: pastOrders.length, color: "info" }
        ].map(({ label, value, color }) => (
          <div key={label} className="col-6 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className={`text-${color}`}>{value}</h3>
                <p className="mb-0 small">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Orders Table */}
      <div className="card">
        <div className="card-body">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            {[
              { key: "current", label: "Current Orders", count: currentOrders.length },
              { key: "past", label: "Past Orders", count: pastOrders.length }
            ].map(({ key, label, count }) => (
              <li key={key} className="nav-item">
                <button 
                  className={`nav-link ${activeTab === key ? "active" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  {label} ({count})
                </button>
              </li>
            ))}
          </ul>
          
          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3"></div>
              <p>Loading orders...</p>
            </div>
          ) : displayOrders.length === 0 ? (
            <div className="text-center py-5">
              <h5>No {activeTab === "current" ? "upcoming" : "past"} orders</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Table</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayOrders.map(order => (
                    <tr key={order.id}>
                      <td><strong>#{order.id}</strong></td>
                      <td>{formatDate(order.date)}</td>
                      <td>{order.time}</td>
                      <td>{order.guests}</td>
                      <td>
                        Table {order.table}
                        <div className="text-muted small">{CONFIG.tables[order.table]}</div>
                      </td>
                      <td>
                        <span className={`badge bg-${CONFIG.statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        {order.status === "confirmed" && (
                          <>
                            <ActionButton action="preOrder" order={order} />
                            <ActionButton action="cancel" order={order} />
                          </>
                        )}
                        {order.status === "pending" && (
                          <ActionButton action="preOrder" order={order} />
                        )}
                        {order.status === "completed" && (
                          <ActionButton action="bookAgain" order={order} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;