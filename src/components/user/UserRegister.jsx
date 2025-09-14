import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from "emailjs-com";
import { Link } from 'react-router-dom'
import bgImg from '../../assets/image/user/kitchen-6878026.jpg'


const UserRegister = () => {

  document.title = "User Register | SmartDine";
  
  const navigate = useNavigate();

  const icon = 'input-group-text text-muted';

  // Form Fields
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_mobile_no: '',
    user_password: '',
    user_confirm_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Password and Confirm Password
  const validateBeforeSubmit = () => {
    if (formData.user_password !== formData.user_confirm_password) {
      toast.error('Passwords do not match.');
      return false;
    }
    return true;
  };

  // Button Submit Handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBeforeSubmit()) return;

    const otp = Math.floor(10000 + Math.random() * 90000).toString();

    // 📌 Wrap with toast.promise
    toast.promise(
      emailjs.send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        process.env.REACT_APP_USER_OTP_TEMPLATE_ID,
        {
          to_email: formData.user_email,
          otp: otp,
        },
        process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
      ),
      {
        loading: "Sending OTP...",
        success: () => {

          navigate("/otp-verification", { state: { data: formData, otp, type: "user" } });
          return "OTP sent to your email!";
        },
        error: (err) => {
          console.error("EmailJS error:", err);
          return "Failed to send OTP. Try again!";
        },
      }
    );
  };


  return (
    <div className="smartdine-banner" style={{ backgroundImage: `url(${bgImg})` }} id="userregister">

      {/* Overlay */}
      <div className="smartdine-overlay opacity-75"></div>
      <div className="position-relative z-1 w-100">
        <div className="container px-3">
          <div className="row">
            <div className="col-md-3"></div>

            {/* Registration Form */}
            <div className="col-md-6 p-md-5 px-4 py-5 shadow rounded smartdine-overlay position-relative">

              <div className="row cl5 mb-3">
                <span className="fs-3 fw-semibold f2">
                  <i className="bi bi-person-plus me-3"></i>
                  User Registration
                </span>
                {/* <span className="">"Hungry for good times and great meals? Join SmartDine and become the VIP of your dining stories!"</span> */}
              </div>

              <hr className="border-light border-1" />

              <form onSubmit={handleSubmit} className='f5'>
                {/* Name */}
                <div className="my-3 input-group">
                  <span className={icon}>
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="my-3 input-group">
                  <span className={icon}>
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                </div>

                {/* Mobile No */}
                <div className="my-3 input-group">
                  <span className={icon}>
                    <i className="bi bi-telephone"></i>
                  </span>
                  <input
                    type="tel"
                    name="user_mobile_no"
                    value={formData.user_mobile_no}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Mobile No"
                    pattern="^[0-9]{10}$"
                    required
                  />
                </div>

                {/* Password */}
                <div className="my-3 input-group">
                  <span className={icon}>
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    name="user_password"
                    value={formData.user_password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Password"
                    minLength="8"
                    maxLength="30"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="my-3 input-group">
                  <span className={icon}>
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    name="user_confirm_password"
                    value={formData.user_confirm_password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Confirm Password"
                    minLength="8"
                    maxLength="30"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-danger w-100 mt-3">
                  <i className="bi bi-person-plus me-2"></i>
                  Register
                </button>

                <hr className='border-light my-4' />
                <div className="d-grid justify-content-center mt-3">
                  <span className='cl5'>
                    Already have an account?
                    <Link to="/user-login" className='text-decoration-none mx-2 fw-semibold cl1'>
                      Login
                    </Link>
                  </span>
                </div>
              </form>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegister