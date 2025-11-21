import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApiService from "../../apiservice/ApiService";
import { RestaurantContext } from "../../context/Context";
import logo from '../../assets/image/general/logo.png'


const OtpVerification = () => {
    document.title = "Email Verification | SmartDine";
    const { sendWelcomeEmail } = useContext(RestaurantContext);
    const location = useLocation();
    const navigate = useNavigate();

    //   const { formData, otp } = location.state || {};
    const { data, otp, type } = location.state || {};
    const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(120);


    useEffect(() => {
        if (!data || !otp) {
            toast.error("Invalid access. Please register again.");

            if (type === "restaurant") {
                navigate("/restaurant-register");
            } else {
                navigate("/user-register"); 
            }
        }

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
    }, [navigate, data, otp, type, timeLeft]);


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
        <>
            <div className="container">
                <div className="row d-grid justify-content-md-start justify-content-center">
                    <Link to="/">
                        <img src={logo} className="img img-fluid " alt="SmartDine Logo" style={{ height: 75 }} />
                    </Link>
                </div>
            </div>
            
            <div className="d-flex justify-content-center align-items-center px-md-0 px-2" style={{ height: "75vh" }}>

                <div className="card shadow-lg p-md-5 py-5 px-4 w-100" style={{ maxWidth: "450px", borderRadius: "12px" }}>
                    <h4 className="fw-bold mb-3 text-capitalize text-center">Verify your email address </h4>

                    <p className="text-muted small mb-4 text-center">
                        Please Enter the 5-digit code we sent to <b>{data?.email}</b>
                        ({type === "user" ? "User Registration" : "Restaurant Registration"})
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center gap-2 mb-3 cl2">
                            {otpValues.map((val, index) => (
                                <input
                                    key={index} type="text" maxLength="1"
                                    className="form-control text-center fw-bold"
                                    style={{ width: "50px", height: "50px" }}
                                    value={val} ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    required
                                />
                            ))}
                        </div>

                        <div className="d-flex justify-content-start ps-1 mb-4">
                            {timeLeft > 0 ? (
                                <small className="text-muted">
                                    Redirect in <span className="fw-bold cl3">{timeLeft}</span>s
                                </small>
                            ) : (
                                <Link to="/" className="small text-decoration-none text-primary">
                                    Resend
                                </Link>
                            )}
                        </div>

                        <button type="submit" className="btn btn-danger w-100 mb-2 rounded-pill">
                            Verify
                        </button>

                        <button type="button" className="btn btn-outline-secondary w-100 rounded-pill"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </button>

                    </form>
                </div>
            </div>
        </>

    );
};

export default OtpVerification