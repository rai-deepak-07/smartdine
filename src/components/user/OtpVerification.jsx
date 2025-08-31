import React from 'react'
import { Link } from 'react-router-dom';
const OtpVerification = () => {
    const items = [
        { id: 1, name: 'otp1' },
        { id: 2, name: 'otp2' },
        { id: 3, name: 'otp3' },
        { id: 4, name: 'otp4' },
        { id: 5, name: 'otp5' },
    ];
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-5 w-100"  style={{maxWidth: "450px", borderRadius: "12px"}}>

                <div className="d-flex justify-content-between mb-4">
                    <h4 className="fw-bold text-primary">OTP Verification</h4>
                </div>


                <p className="text-muted small mb-4">
                    Please enter the OTP (One-Time Password) sent to your registered email to complete your verification.
                </p>


                <form id="otpForm">

                    <div className="d-flex justify-content-center gap-2 mb-3">
                        {items.map(item => (
                            <input type="text" maxlength="1" name={item.name} className="form-control text-center otp-input" style={{ width: "50px", height: "50px" }} autofocus required />
                        ))}
                    </div>


                    <div className="d-flex justify-content-between mb-4">
                        <small className="text-muted">Resending in <span id="timer">30</span>s</small>
                        <Link to="/" id="resendLink" className="small text-decoration-none disabled" style={{ pointerEvents: "none" }}>Resend</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2 rounded-pill">Verify</button>
                    <button type="button" className="btn btn-outline-secondary w-100 rounded-pill" onclick="window.history.back()">Cancel</button>
                </form>
            </div>
        </div>


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

  )
}

export default OtpVerification


