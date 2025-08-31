// import React from 'react'

// const Maintanence = () => {
//   return (
//     <div>
//         <h1>Maintenance Mode</h1>
//         <p>We are currently undergoing maintenance. Please check back later.</p>
//     </div>
//   )
// }

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("Dec 31, 2025 23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: "0", hours: "0", minutes: "0", seconds: "0" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column position-relative text-white overflow-hidden">
      {/* Background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') no-repeat center center/cover",
        }}
      ></div>

      {/* Dark Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
        style={{ backdropFilter: "blur(3px)" }}
      ></div>

      {/* Main Content Container */}
      <div className="container d-flex flex-column justify-content-between flex-grow-1 py-4 py-md-5 position-relative z-1">
        
        {/* Header Section */}
        <div className="row justify-content-center pt-4 pt-md-5">
          <div className="col-12 text-center">
            <h1 className="fw-bold display-6 display-md-2 mb-0">
              <span className="text-warning">🏨</span> SmartDine
            </h1>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="row justify-content-center my-auto py-4">
          <div className="col-12 col-md-10 col-lg-8 text-center">
            
            {/* Heading */}
            <h2 className="fw-bold display-3 display-md-3 mb-3 mb-md-4">
              Coming Soon
            </h2>
            
            {/* Subheading */}
            <h3 className="text-light mb-3 fs-4 fs-md-3">
              Our website is under construction
            </h3>
            
            {/* Description */}
            <p className="text-light fs-5 mb-4 mb-md-5 lh-lg">
              We are working very hard to give you the best dining experience with innovative features.
            </p>

            {/* Countdown Timer */}
            <div className="d-flex justify-content-center gap-3 gap-md-4 gap-lg-5 mb-4 mb-md-5 flex-wrap">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="d-flex flex-column align-items-center px-3 py-3 rounded-4" 
                     style={{ background: 'rgba(255, 255, 255, 0.1)', minWidth: '90px', backdropFilter: 'blur(5px)' }}>
                  <h2 className="fw-bold display-4 mb-0 countdown-number">{value}</h2>
                  <span className="text-uppercase small mt-2 opacity-75">
                    {unit}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Button */}
            <a
              href="mailto:info@example.com"
              className="btn btn-outline-light px-4 px-md-5 py-2 py-md-3 fs-5 fw-semibold rounded-3 mt-3"
              style={{ 
                transition: 'all 0.3s',
                borderWidth: '2px',
              }}
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer with Copyright */}
        <div className="row justify-content-center pb-3">
          <div className="col-12 text-center">
            <p className="small opacity-75 mb-0">
              © 2025 SmartDine. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .display-4 {
              font-size: 2.5rem;
            }
            
            .countdown-number {
              font-size: 2rem;
            }
          }
          
          .countdown-number {
            background: linear-gradient(135deg, #fff 0%, #e6e6e6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        `}
      </style>
    </div>
  );
};

export default ComingSoon;