import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ApiService from '../../apiservice/ApiService';
import emailjs from "emailjs-com";


const UserRegister = () => {

  const navigate = useNavigate(); 

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

  const validateBeforeSubmit = () => {
  if (formData.user_password !== formData.user_confirm_password) {
    toast.error('Passwords do not match.');
    return false;
  }
  return true;
};

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


  //   toast.promise(
  //     ApiService.post('/user/registration/', data,{
  //       headers: {'Content-Type': 'multipart/form-data'}
  //     }),
  //     {
  //       loading: 'Registering...',
  //       success: () => {
  //         navigate('/user-login');
  //         return 'Registration successfully!';
  //       },
  //       error: (error) => {
  //         let msg = "";
  //         console.log(error);
  //         if (error.response?.status === 400) {
  //           if (error.response.data.user_email) {
  //             msg = "Email Already Exist!";
  //           }
  //           if (error.response.data.user_mobile_no) {
  //             msg = "Mobile No Already Exist!";
  //           }
  //           toast.error(msg || 'Invalid data provided.');
  //         }
  //       },
  //     }
  //   );
  // }


  return (
    <div>
   
      {/* <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_name">Name:</label>
        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />

        <label htmlFor="user_email">Email:</label>
        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required />

        <label htmlFor="user_mobile_no">Mobile No:</label>
        <input type="tel" name="user_mobile_no" value={formData.user_mobile_no} onChange={handleChange} required />

        <label htmlFor="user_password">Password:</label>
        <input type="password" name="user_password" value={formData.user_password} onChange={handleChange}
        minLength={8} maxLength={30} required />

        <label htmlFor="user_confirm_password">Confirm Password:</label>
        <input type="password" name="user_confirm_password" value={formData.user_confirm_password} onChange={handleChange} minLength={8} maxLength={30} required />

        <button type='submit'>Register</button>

      </form> */}
 
<section
  className="d-flex justify-content-center align-items-center vh-100"
  style={{
    backgroundImage:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLFggScyGN7Dz3bf8g7Hc4KN803aen2xc4w&s')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
    position: "relative"
  }}
>
  {/* Blurred Background Overlay */}
  {/* <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
      backdropFilter: "blur(0px)", // ✅ Background blur
      WebkitBackdropFilter: "blur(0px)",
      zIndex: 1
    }}
  ></div> */}

  {/* Glass Effect Card with Image */}
  <div
    className="rounded-4 shadow-lg overflow-hidden"
    style={{
      width: "100%",
      maxWidth: "900px",
      background: "rgba(6, 6, 6, 0.15)", // Transparent glass effect
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "4px solid rgba(9, 9, 9, 0.3)",
      zIndex: 2,
      position: "relative",
      color: "#0a0a0aff"
    }}
  >
    <div className="row g-0" style={{ height: "100%" }}>
      {/* Left: Registration Form */}
      <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
       <h1 className="text-center text-black mb-3">User Registration</h1>
    <form onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="mb-2 fs-5">
        <label htmlFor="user_name" className="form-label text-black">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="user_name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div className="mb-2 fs-5">
        <label htmlFor="user_email" className="form-label text-black">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="user_email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Mobile */}
      <div className="mb-2 fs-5">
        <label htmlFor="user_mobile_no" className="form-label text-black">
          Mobile No:
        </label>
        <input
          type="tel"
          className="form-control"
          id="user_mobile_no"
          name="user_mobile_no"
          value={formData.user_mobile_no}
          onChange={handleChange}
          pattern="^[0-9]{10}$"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-2 fs-5">
        <label htmlFor="user_password" className="form-label text-black">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="user_password"
          name="user_password"
          value={formData.user_password}
          onChange={handleChange}
          minLength="8"
          maxLength="30"
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-3 fs-5">
        <label
          htmlFor="user_confirm_password"
          className="form-label text-black"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="user_confirm_password"
          name="user_confirm_password"
          value={formData.user_confirm_password}
          onChange={handleChange}
          minLength="8"
          maxLength="30"
          required
        />
      </div>
     

      {/* Submit */}
      <div className="d-grid mb-2">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
   
    </form>

      </div>

      {/* Right: Image */}
      <div className="col-md-6 d-none d-md-block">
        <img
          src="https://thvnext.bing.com/th/id/OIP.kADFlcoRVwCn_K20bFQX-AHaE7?w=232&h=180&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.5&pid=1.7&rm=3"
          alt="Side Visual"
          className="img-fluid"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover"
          }}
        />
      </div>
    </div>
  </div>
</section>

  

</div>
        
  )
}

export default UserRegister
