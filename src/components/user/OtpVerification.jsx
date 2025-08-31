// import React from 'react'
// import { Link } from 'react-router-dom';
// const OtpVerification = () => {
//     const items = [
//         { id: 1, name: 'otp1' },
//         { id: 2, name: 'otp2' },
//         { id: 3, name: 'otp3' },
//         { id: 4, name: 'otp4' },
//         { id: 5, name: 'otp5' },
//     ];
//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100">
//             <div className="card shadow-lg p-5 w-100"  style={{maxWidth: "450px", borderRadius: "12px"}}>

//                 <div className="d-flex justify-content-between mb-4">
//                     <h4 className="fw-bold text-primary">OTP Verification</h4>
//                 </div>


//                 <p className="text-muted small mb-4">
//                     Please enter the OTP (One-Time Password) sent to your registered email to complete your verification.
//                 </p>


//                 <form id="otpForm">

//                     <div className="d-flex justify-content-center gap-2 mb-3">
//                         {items.map(item => (
//                             <input type="text" maxlength="1" name={item.name} className="form-control text-center otp-input" style={{ width: "50px", height: "50px" }} autofocus required />
//                         ))}
//                     </div>


//                     <div className="d-flex justify-content-between mb-4">
//                         <small className="text-muted">Resending in <span id="timer">30</span>s</small>
//                         <Link to="/" id="resendLink" className="small text-decoration-none disabled" style={{ pointerEvents: "none" }}>Resend</Link>
//                     </div>
//                     <button type="submit" className="btn btn-primary w-100 mb-2 rounded-pill">Verify</button>
//                     <button type="button" className="btn btn-outline-secondary w-100 rounded-pill" onclick="window.history.back()">Cancel</button>
//                 </form>
//             </div>
//         </div>


//   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>


//   <script>
//     // Auto move to next input
//     const otpInputs = document.querySelectorAll('.otp-input');
//     otpInputs.forEach((input, index) => {
//       input.addEventListener('input', (e) => {
//         if (e.target.value.length === 1 && index < otpInputs.length - 1) {
//           otpInputs[index + 1].focus();
//         }
//       });
//       input.addEventListener('keydown', (e) => {
//         if (e.key === 'Backspace' && index > 0 && !input.value) {
//           otpInputs[index - 1].focus();
//         }
//       });
//     });

//     // Timer for resend
//     let timeLeft = 30;
//     const timerElement = document.getElementById('timer');
//     const resendLink = document.getElementById('resendLink');

//     const timerInterval = setInterval(() => {
//       timeLeft--;
//       timerElement.textContent = timeLeft;
//       if (timeLeft <= 0) {
//         clearInterval(timerInterval);
//         resendLink.classNameList.remove('disabled');
//         resendLink.style.pointerEvents = 'auto';
//         resendLink.style.color = '#0d6efd'; // Bootstrap primary color
//         timerElement.parentElement.textContent = "You can now resend OTP";
//       }
//     }, 1000);
//   </script>

// </body>
// </html>

//   )
// }

// export default OtpVerification


import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const OtpVerification = () => {
  const OTP_LENGTH = 5;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    setIsDisabled(true);
    setTimeLeft(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) {
      setOtp((prev) => prev.map((item, i) => (i === index ? "" : item)));
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value.charAt(0);
    setOtp(newOtp);
    if (index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      alert("OTP resent successfully!");
      setOtp(Array(OTP_LENGTH).fill(""));
      otpRefs.current[0].focus();
      startTimer();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < OTP_LENGTH) {
      setError("Please enter all digits of the OTP.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`OTP Verified: ${enteredOtp}`);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202222803-5a4b36c4f7f7')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      ></div>

      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card shadow-lg p-5 w-100 position-relative"
        style={{
          maxWidth: "450px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="d-flex justify-content-center mb-4">
          <h3
            className="fw-bold"
            style={{
              background: "linear-gradient(45deg, #ff4b2b, #ff416c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OTP Verification
          </h3>
        </div>

        <p className="small mb-4" style={{ color: "#f0f0f0" }}>
          Enter the OTP sent to your registered email.
        </p>

        <form id="otpForm" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center gap-2 mb-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                className="form-control text-center otp-input"
                style={{
                  width: "55px",
                  height: "55px",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  transition: "0.3s",
                }}
                autoFocus={index === 0}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (otpRefs.current[index] = el)}
              />
            ))}
          </div>

          {error && <p className="text-danger small mb-2">{error}</p>}

          <div className="d-flex justify-content-between mb-4">
            <small style={{ color: "#ddd" }}>
              {isDisabled ? (
                <>Resend in <span>{timeLeft}</span>s</>
              ) : (
                "You can now resend OTP"
              )}
            </small>
            <Link
              to="#"
              className={`small text-decoration-none ${
                isDisabled ? "disabled" : ""
              }`}
              style={{
                pointerEvents: isDisabled ? "none" : "auto",
                color: isDisabled ? "#bbb" : "#ff416c",
                fontWeight: "bold",
              }}
              onClick={handleResend}
            >
              Resend
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn w-100 mb-2 rounded-pill"
            style={{
              background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="btn btn-outline-light w-100 rounded-pill"
            onClick={() => window.history.back()}
          >
            Cancel
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
