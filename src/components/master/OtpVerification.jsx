import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApiService from "../../apiservice/ApiService";
import { ResturantContext } from "../../context/Context";


const OtpVerification = () => {
    const {sendWelcomeEmail} = useContext(ResturantContext);
    const location = useLocation();
    const navigate = useNavigate();

    //   const { formData, otp } = location.state || {};
    const { data, otp, type } = location.state || {};
    const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(120);

    // ❌ Direct access not allowed, redirect if no state
    useEffect(() => {
        if (!data || !otp) {
            toast.error("Invalid access. Please register again.");

            if (type === "restaurant") {
                navigate("/restaurant-register");
            } else {
                navigate("/user-register"); // fallback for user or unknown type
            }
        }
    }, [data, otp, type, navigate]);

    // ⏳ Timer + redirect on expiry
    useEffect(() => {
        if (timeLeft <= 0) {
            toast.error("OTP expired. Please try again.");

            if (type === "user") {
                navigate("/user-register");
            } else if (type === "restaurant") {
                navigate("/restaurant-register");
            } else {
                navigate("/SmartDine"); // fallback
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, type]);


    // 👉 Handle OTP input
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "");

        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);

        if (value && index < otpValues.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otpValues.join("");
        if (enteredOtp !== otp) {
            toast.error("Invalid OTP. Try again.");
            return;
        }

        if (type === "user") {
            toast.promise(
                ApiService.post("user/registration/", data),
                {
                    loading: "Verifying...",
                    success: () => {
                        navigate("/user-login");
                        return "User registered successfully!";
                    },
                    error: () => "Registration failed. Try again.",
                }
            );
        }
        else if (type === "restaurant") {
            // Prepare FormData for restaurant registration
            const formDataToSend = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            toast.promise(
                ApiService.post("restaurant/registration/", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                    timeout: 0,
                })
                    .then(() => {
                        // Send welcome email after successful registration
                        return sendWelcomeEmail(
                            data.owner_name,
                            data.res_name,
                            data.email
                        )
                            .then(() => {
                                navigate("/restaurant-login");
                                return "Restaurant registered successfully! 🎉";
                            })
                            .catch((err) => {
                                console.error("📧 Email sending failed:", err);
                                navigate("/restaurant-login");
                                return "Restaurant registered successfully!";
                            });
                    })
                    .catch((err) => {
                        console.error("❌ Registration failed:", err);
                        throw err;
                    }),
                {
                    loading: "Verifying...",
                    success: (msg) => msg,
                    error: (err) => err.message || "Registration failed. Try again.",
                }
            );
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-5 w-100" style={{ maxWidth: "450px", borderRadius: "12px" }}>
                <h4 className="fw-bold text-primary mb-3">OTP Verification</h4>

                <p className="text-muted small mb-4">
                    Enter the 5-digit OTP sent to <b>{data?.email}</b>
                    ({type === "user" ? "User Registration" : "Restaurant Registration"})
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center gap-2 mb-3">
                        {otpValues.map((val, index) => (
                            <input
                                key={index} type="text" maxLength="1"
                                className="form-control text-center"
                                style={{ width: "50px", height: "50px" }}
                                value={val} ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                required
                            />
                        ))}
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                        {timeLeft > 0 ? (
                            <small className="text-muted">
                                Redirect in <span>{timeLeft}</span>s
                            </small>
                        ) : (
                            <Link to="/" className="small text-decoration-none text-primary">
                                Resend
                            </Link>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-2 rounded-pill">
                        Verify
                    </button>

                    <button type="button" className="btn btn-outline-secondary w-100 rounded-pill"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
};

export default OtpVerification