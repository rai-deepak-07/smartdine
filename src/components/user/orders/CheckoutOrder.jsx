// // // import React from 'react'

// // // const CheckoutOrder = () => {
// // //   return (
// // //     <div className="container">
// // //       <h1>Checkout Order</h1>
// // //     </div>
// // //   )
// // // }

// // // export default CheckoutOrder

// // import React, { useState } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const CheckoutOrder = () => {
// //   // JSON data for restaurant and order
// //   const orderData = {
// //     restaurant: {
// //       id: 1,
// //       name: "Delicious Bites",
// //       image: "https://picsum.photos/seed/restaurant/600/400.jpg",
// //       rating: 4.5,
// //       deliveryTime: "30-40 min",
// //       address: "123 Food Street, Culinary District"
// //     },
// //     orderItems: [
// //       { id: 1, name: "Paneer Butter Masala", price: 220, quantity: 2, isVeg: true },
// //       { id: 2, name: "Veg Biryani", price: 250, quantity: 1, isVeg: true },
// //       { id: 3, name: "Spring Rolls", price: 120, quantity: 1, isVeg: true },
// //       { id: 4, name: "Cold Coffee", price: 90, quantity: 2, isVeg: true }
// //     ],
// //     paymentMethods: [
// //       { id: "cod", name: "Cash on Delivery", icon: "💵" },
// //       { id: "card", name: "Credit/Debit Card", icon: "💳" },
// //       { id: "upi", name: "UPI Payment", icon: "📱" },
// //       { id: "wallet", name: "Wallet", icon: "👛" }
// //     ]
// //   };

// //   const [selectedPayment, setSelectedPayment] = useState("cod");
// //   const [deliveryDetails, setDeliveryDetails] = useState({
// //     name: "",
// //     phone: "",
// //     address: "",
// //     instructions: ""
// //   });

// //   // Calculate order totals
// //   const subtotal = orderData.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
// //   const deliveryFee = 40;
// //   const taxes = Math.round(subtotal * 0.05);
// //   const total = subtotal + deliveryFee + taxes;

// //   // Handle form input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setDeliveryDetails(prev => ({ ...prev, [name]: value }));
// //   };

// //   return (
// //     <div className="container py-4">
// //       <h1 className="mb-4">Checkout Order</h1>
      
// //       <div className="row">
// //         {/* Left Column - Restaurant & Order Details */}
// //         <div className="col-lg-7 mb-4">
// //           {/* Restaurant Card */}
// //           <div className="card mb-4 shadow-sm">
// //             <img src={orderData.restaurant.image} className="card-img-top" alt={orderData.restaurant.name} style={{ height: "200px", objectFit: "cover" }} />
// //             <div className="card-body">
// //               <h4 className="card-title">{orderData.restaurant.name}</h4>
// //               <div className="d-flex align-items-center mb-2">
// //                 <span className="text-warning me-1">⭐</span>
// //                 <span className="me-3">{orderData.restaurant.rating}</span>
// //                 <span className="me-3">⏱️ {orderData.restaurant.deliveryTime}</span>
// //               </div>
// //               <p className="card-text text-muted">{orderData.restaurant.address}</p>
// //             </div>
// //           </div>

// //           {/* Order Items */}
// //           <div className="card shadow-sm">
// //             <div className="card-header bg-light">
// //               <h5 className="mb-0">Order Summary</h5>
// //             </div>
// //             <div className="card-body">
// //               {orderData.orderItems.map(item => (
// //                 <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
// //                   <div className="d-flex align-items-center">
// //                     <span className="me-2">{item.isVeg ? '🟢' : '🔴'}</span>
// //                     <div>
// //                       <h6 className="mb-0">{item.name}</h6>
// //                       <span className="text-muted">Qty: {item.quantity}</span>
// //                     </div>
// //                   </div>
// //                   <div className="text-end">
// //                     <span className="fw-bold">₹{item.price * item.quantity}</span>
// //                   </div>
// //                 </div>
// //               ))}
              
// //               <div className="mt-3">
// //                 <div className="d-flex justify-content-between mb-2">
// //                   <span>Subtotal</span>
// //                   <span>₹{subtotal}</span>
// //                 </div>
// //                 <div className="d-flex justify-content-between mb-2">
// //                   <span>Delivery Fee</span>
// //                   <span>₹{deliveryFee}</span>
// //                 </div>
// //                 <div className="d-flex justify-content-between mb-2">
// //                   <span>Taxes</span>
// //                   <span>₹{taxes}</span>
// //                 </div>
// //                 <div className="d-flex justify-content-between mt-3 pt-3 border-top">
// //                   <h5>Total</h5>
// //                   <h5>₹{total}</h5>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Column - Billing Details */}
// //         <div className="col-lg-5">
// //           <div className="card shadow-sm">
// //             <div className="card-header bg-light">
// //               <h5 className="mb-0">Delivery Details</h5>
// //             </div>
// //             <div className="card-body">
// //               <form>
// //                 <div className="mb-3">
// //                   <label htmlFor="name" className="form-label">Full Name</label>
// //                   <input type="text" className="form-control" id="name" name="name" value={deliveryDetails.name} onChange={handleInputChange} required />
// //                 </div>
// //                 <div className="mb-3">
// //                   <label htmlFor="phone" className="form-label">Phone Number</label>
// //                   <input type="tel" className="form-control" id="phone" name="phone" value={deliveryDetails.phone} onChange={handleInputChange} required />
// //                 </div>
// //                 <div className="mb-3">
// //                   <label htmlFor="address" className="form-label">Delivery Address</label>
// //                   <textarea className="form-control" id="address" name="address" rows="3" value={deliveryDetails.address} onChange={handleInputChange} required></textarea>
// //                 </div>
// //                 <div className="mb-3">
// //                   <label htmlFor="instructions" className="form-label">Delivery Instructions (Optional)</label>
// //                   <textarea className="form-control" id="instructions" name="instructions" rows="2" value={deliveryDetails.instructions} onChange={handleInputChange}></textarea>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>

// //           <div className="card shadow-sm mt-4">
// //             <div className="card-header bg-light">
// //               <h5 className="mb-0">Payment Method</h5>
// //             </div>
// //             <div className="card-body">
// //               {orderData.paymentMethods.map(method => (
// //                 <div key={method.id} className="mb-2">
// //                   <div className="form-check">
// //                     <input className="form-check-input" type="radio" name="paymentMethod" id={method.id} checked={selectedPayment === method.id} onChange={() => setSelectedPayment(method.id)} />
// //                     <label className="form-check-label d-flex align-items-center" htmlFor={method.id}>
// //                       <span className="me-2 fs-5">{method.icon}</span>
// //                       <span>{method.name}</span>
// //                     </label>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <button className="btn btn-success w-100 mt-4 py-2 fw-bold" onClick={() => alert('Order placed successfully!')}>
// //             Place Order • ₹{total}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutOrder;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CheckoutOrder = () => {
//   // JSON data for restaurant and order
//   const orderData = {
//     restaurant: {
//       id: 1,
//       name: "Delicious Bites",
//       image: "https://picsum.photos/seed/restaurant/600/400.jpg",
//       rating: 4.5,
//       tableNumber: "A12",
//       serverName: "John"
//     },
//     orderItems: [
//       { id: 1, name: "Paneer Butter Masala", price: 220, quantity: 2, isVeg: true },
//       { id: 2, name: "Veg Biryani", price: 250, quantity: 1, isVeg: true },
//       { id: 3, name: "Spring Rolls", price: 120, quantity: 1, isVeg: true },
//       { id: 4, name: "Cold Coffee", price: 90, quantity: 2, isVeg: true }
//     ],
//     paymentMethods: [
//       { id: "card", name: "Credit/Debit Card", icon: "💳" },
//       { id: "cash", name: "Cash", icon: "💵" },
//       { id: "upi", name: "UPI Payment", icon: "📱" },
//       { id: "wallet", name: "Digital Wallet", icon: "👛" }
//     ]
//   };

//   const [selectedPayment, setSelectedPayment] = useState("card");
//   const [customerDetails, setCustomerDetails] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     feedback: ""
//   });

//   // Calculate order totals
//   const subtotal = orderData.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const serviceCharge = Math.round(subtotal * 0.1);
//   const taxes = Math.round(subtotal * 0.05);
//   const total = subtotal + serviceCharge + taxes;

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerDetails(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="container py-4">
//       <h1 className="mb-4">Checkout Order</h1>
      
//       <div className="row">
//         {/* Left Column - Restaurant & Order Details */}
//         <div className="col-lg-7 mb-4">
//           {/* Restaurant Card */}
//           <div className="card mb-4 shadow-sm">
//             <img src={orderData.restaurant.image} className="card-img-top" alt={orderData.restaurant.name} style={{ height: "200px", objectFit: "cover" }} />
//             <div className="card-body">
//               <h4 className="card-title">{orderData.restaurant.name}</h4>
//               <div className="d-flex align-items-center mb-2">
//                 <span className="text-warning me-1">⭐</span>
//                 <span className="me-3">{orderData.restaurant.rating}</span>
//                 <span className="me-3">🪑 Table: {orderData.restaurant.tableNumber}</span>
//                 <span className="me-3">👤 Server: {orderData.restaurant.serverName}</span>
//               </div>
//             </div>
//           </div>

//           {/* Order Items */}
//           <div className="card shadow-sm">
//             <div className="card-header bg-light">
//               <h5 className="mb-0">Your Order</h5>
//             </div>
//             <div className="card-body">
//               {orderData.orderItems.map(item => (
//                 <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
//                   <div className="d-flex align-items-center">
//                     <span className="me-2">{item.isVeg ? '🟢' : '🔴'}</span>
//                     <div>
//                       <h6 className="mb-0">{item.name}</h6>
//                       <span className="text-muted">Qty: {item.quantity} × ₹{item.price}</span>
//                     </div>
//                   </div>
//                   <div className="text-end">
//                     <span className="fw-bold">₹{item.price * item.quantity}</span>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="mt-3">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal}</span>
//                 </div>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Service Charge (10%)</span>
//                   <span>₹{serviceCharge}</span>
//                 </div>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Taxes</span>
//                   <span>₹{taxes}</span>
//                 </div>
//                 <div className="d-flex justify-content-between mt-3 pt-3 border-top">
//                   <h5>Total</h5>
//                   <h5>₹{total}</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Billing Details */}
//         <div className="col-lg-5">
//           <div className="card shadow-sm">
//             <div className="card-header bg-light">
//               <h5 className="mb-0">Customer Details</h5>
//             </div>
//             <div className="card-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">Full Name</label>
//                   <input type="text" className="form-control" id="name" name="name" value={customerDetails.name} onChange={handleInputChange} required />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="phone" className="form-label">Phone Number</label>
//                   <input type="tel" className="form-control" id="phone" name="phone" value={customerDetails.phone} onChange={handleInputChange} required />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">Email (Optional)</label>
//                   <input type="email" className="form-control" id="email" name="email" value={customerDetails.email} onChange={handleInputChange} />
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="card shadow-sm mt-4">
//             <div className="card-header bg-light">
//               <h5 className="mb-0">Payment Method</h5>
//             </div>
//             <div className="card-body">
//               {orderData.paymentMethods.map(method => (
//                 <div key={method.id} className="mb-2">
//                   <div className="form-check">
//                     <input className="form-check-input" type="radio" name="paymentMethod" id={method.id} checked={selectedPayment === method.id} onChange={() => setSelectedPayment(method.id)} />
//                     <label className="form-check-label d-flex align-items-center" htmlFor={method.id}>
//                       <span className="me-2 fs-5">{method.icon}</span>
//                       <span>{method.name}</span>
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="card shadow-sm mt-4">
//             <div className="card-header bg-light">
//               <h5 className="mb-0">Feedback (Optional)</h5>
//             </div>
//             <div className="card-body">
//               <textarea className="form-control" id="feedback" name="feedback" rows="3" value={customerDetails.feedback} onChange={handleInputChange} placeholder="How was your experience?"></textarea>
//             </div>
//           </div>

//           <button className="btn btn-success w-100 mt-4 py-2 fw-bold" onClick={() => alert('Payment successful! Thank you for dining with us.')}>
//             Pay Bill • ₹{total}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutOrder;

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