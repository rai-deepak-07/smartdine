// import React from 'react'

// const Maintanence = () => {
//   return (
//     <div>
//         <h1>Maintenance Mode</h1>
//         <p>We are currently undergoing maintenance. Please check back later.</p>
//     </div>
//   )
// }

// export default Maintanence


import React, { useState, useEffect } from "react";
import Maintanence from "./Maintanence";

export default function App() {
  const [maintenance, setMaintenance] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeTab, setActiveTab] = useState("countdown");
  const [progress, setProgress] = useState(0);

  // Set your target date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 218);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Progress bar simulation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 800);
    
    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      showNotificationWithMessage("Please enter a valid email address");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setEmail("");
      showNotificationWithMessage("Thank you for subscribing!");
    }, 500);
  };

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleContact = () => {
    showNotificationWithMessage("Contact form will appear here!");
  };

  const handleSocialShare = (platform) => {
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this upcoming website!`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    };
    
    window.open(shareUrls[platform], '_blank');
  };

  // If maintenance mode ON → show Maintanence page
  if (maintenance) {
    return <Maintanence />;
  }

  return (
    <div className="min-h-screen bg-dark text-white" style={{ 
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Animated background elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="position-absolute rounded-circle bg-warning"
            style={{
              width: Math.random() * 50 + 10 + 'px',
              height: Math.random() * 50 + 10 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `pulse ${Math.random() * 5 + 3}s infinite ${Math.random() * 2}s both`
            }}
          />
        ))}
      </div>

      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div className="bg-dark bg-opacity-75 p-4 p-md-5 rounded-4 shadow-lg text-center w-100" style={{ maxWidth: '650px', backdropFilter: 'blur(10px)' }}>
          <h1 className="display-4 fw-bold mb-2 text-warning">Coming Soon</h1>
          <p className="lead text-warning mb-3">
            Our website is under construction now
          </p>
          <p className="text-light mb-5">
            We Are Working Very Hard To Give You The Best Experience With This One
          </p>

          {/* Progress bar */}
          <div className="progress mb-4" style={{ height: '8px' }}>
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
              role="progressbar" 
              style={{ width: `${progress}%` }}
              aria-valuenow={progress} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
          <p className="small text-muted mb-4">Development Progress: {Math.round(progress)}%</p>

          {/* Tab navigation */}
          <ul className="nav nav-pills justify-content-center mb-4 border-bottom pb-3">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'countdown' ? 'active bg-warning text-dark' : 'text-light'}`}
                onClick={() => setActiveTab('countdown')}
              >
                Countdown
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'subscribe' ? 'active bg-warning text-dark' : 'text-light'}`}
                onClick={() => setActiveTab('subscribe')}
              >
                Notify Me
              </button>
            </li>
          </ul>

          {/* Tab content */}
          {activeTab === 'countdown' && (
            <div className="row g-3 mb-4">
              <div className="col-6 col-md-3">
                <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <div className="display-5 fw-bold">{timeLeft.days}</div>
                  <div className="small text-muted">Days</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <div className="display-5 fw-bold">{timeLeft.hours}</div>
                  <div className="small text-muted">Hours</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <div className="display-5 fw-bold">{timeLeft.minutes}</div>
                  <div className="small text-muted">Minutes</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <div className="display-5 fw-bold">{timeLeft.seconds}</div>
                  <div className="small text-muted">Seconds</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscribe' && (
            <div className="mb-4">
              {subscribed ? (
                <div className="alert alert-success bg-success bg-opacity-25 border border-success">
                  <i className="fas fa-check-circle me-2"></i>
                  You're subscribed! We'll notify you when we launch.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="d-flex flex-column flex-md-row gap-2 justify-content-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-control bg-dark bg-opacity-50 text-light border-secondary"
                    style={{ minWidth: '200px' }}
                  />
                  <button 
                    type="submit"
                    className="btn btn-warning text-dark fw-semibold"
                  >
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-4">
            <button 
              onClick={handleContact}
              className="btn btn-warning text-dark fw-semibold"
            >
              <i className="fas fa-envelope me-2"></i>Contact Us
            </button>
            
            <button 
              onClick={() => setMaintenance(true)}
              className="btn btn-outline-light"
            >
              <i className="fas fa-tools me-2"></i>Maintenance Mode
            </button>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
            <span className="text-muted">Share:</span>
            <button 
              onClick={() => handleSocialShare('facebook')}
              className="btn btn-outline-light btn-sm"
            >
              <i className="fab fa-facebook-f"></i>
            </button>
            <button 
              onClick={() => handleSocialShare('twitter')}
              className="btn btn-outline-light btn-sm"
            >
              <i className="fab fa-twitter"></i>
            </button>
            <button 
              onClick={() => handleSocialShare('linkedin')}
              className="btn btn-outline-light btn-sm"
            >
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <footer className="mt-4 small text-muted">
            © 2025 Hotel Coming Soon. All Rights Reserved | Design By You
          </footer>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="position-fixed bottom-0 end-0 m-4">
          <div className="toast show" role="alert">
            <div className="toast-header bg-warning text-dark">
              <strong className="me-auto">Notification</strong>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowNotification(false)}
              ></button>
            </div>
            <div className="toast-body bg-dark text-light">
              {notificationMessage}
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.3; transform: scale(0.95); }
            50% { opacity: 0.6; transform: scale(1.05); }
            100% { opacity: 0.3; transform: scale(0.95); }
          }
          
          .bg-dark {
            background-color: #1a1a1a !important;
          }
          
          .btn-warning {
            background-color: #ffc107;
            border-color: #ffc107;
          }
          
          .btn-warning:hover {
            background-color: #e0a800;
            border-color: #e0a800;
          }
        `}
      </style>
    </div>
  );
}