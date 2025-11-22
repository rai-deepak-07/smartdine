import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutOrder = () => {
  // JSON data for restaurant and order
  const orderData = {
    restaurant: {
      id: 1,
      name: "Delicious Bites",
      image: "https://picsum.photos/seed/restaurant/600/400.jpg",
      rating: 4.5,
      tableNumber: "A12",
      serverName: "John"
    },
    orderItems: [
      { id: 1, name: "Paneer Butter Masala", price: 220, quantity: 2, isVeg: true },
      { id: 2, name: "Veg Biryani", price: 250, quantity: 1, isVeg: true },
      { id: 3, name: "Spring Rolls", price: 120, quantity: 1, isVeg: true },
      { id: 4, name: "Cold Coffee", price: 90, quantity: 2, isVeg: true }
    ],
    paymentMethods: [
      { id: "card", name: "Credit/Debit Card", icon: "💳" },
      { id: "cash", name: "Cash", icon: "💵" },
      { id: "upi", name: "UPI Payment", icon: "📱" },
      { id: "wallet", name: "Digital Wallet", icon: "👛" }
    ]
  };

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [feedback, setFeedback] = useState("");

  // Calculate order totals
  const subtotal = orderData.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceCharge = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + serviceCharge + taxes;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Checkout Order</h1>
      
      <div className="row">
        {/* Left Column - Restaurant & Order Details */}
        <div className="col-lg-7 mb-4">
          {/* Restaurant Card */}
          <div className="card mb-4 shadow-sm">
            <img src={orderData.restaurant.image} className="card-img-top" alt={orderData.restaurant.name} style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body">
              <h4 className="card-title">{orderData.restaurant.name}</h4>
              <div className="d-flex align-items-center mb-2">
                <span className="text-warning me-1">⭐</span>
                <span className="me-3">{orderData.restaurant.rating}</span>
                <span className="me-3">🪑 Table: {orderData.restaurant.tableNumber}</span>
                <span className="me-3">👤 Server: {orderData.restaurant.serverName}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Your Order</h5>
            </div>
            <div className="card-body">
              {orderData.orderItems.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="me-2">{item.isVeg ? '🟢' : '🔴'}</span>
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <span className="text-muted">Qty: {item.quantity} × ₹{item.price}</span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
              
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Service Charge (10%)</span>
                  <span>₹{serviceCharge}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                  <h5>Total</h5>
                  <h5>₹{total}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Billing Details */}
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Payment Method</h5>
            </div>
            <div className="card-body">
              {orderData.paymentMethods.map(method => (
                <div key={method.id} className="mb-2">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="paymentMethod" id={method.id} checked={selectedPayment === method.id} onChange={() => setSelectedPayment(method.id)} />
                    <label className="form-check-label d-flex align-items-center" htmlFor={method.id}>
                      <span className="me-2 fs-5">{method.icon}</span>
                      <span>{method.name}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Feedback (Optional)</h5>
            </div>
            <div className="card-body">
              <textarea className="form-control" id="feedback" name="feedback" rows="3" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="How was your experience?"></textarea>
            </div>
          </div>

          <button className="btn btn-success w-100 mt-4 py-2 fw-bold" onClick={() => alert('Payment successful! Thank you for dining with us.')}>
            Pay Bill • ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrder;