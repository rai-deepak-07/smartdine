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

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_name">Name:</label>
        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
        <br />
        <label htmlFor="user_email">Email:</label>
        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required />
        <br />
        <label htmlFor="user_mobile_no">Mobile No:</label>
        <input type="tel" name="user_mobile_no" value={formData.user_mobile_no} onChange={handleChange} required />
        <br />
        <label htmlFor="user_password">Password:</label>
        <input type="password" name="user_password" value={formData.user_password} onChange={handleChange}
        minLength={8} maxLength={30} required />
        <br />
        <label htmlFor="user_confirm_password">Confirm Password:</label>
        <input type="password" name="user_confirm_password" value={formData.user_confirm_password} onChange={handleChange} minLength={8} maxLength={30} required />
        <br />
        <button type='submit'>Register</button>
      </form>
  
    </div>
  )
}

export default UserRegister
