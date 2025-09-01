import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ApiService from '../../apiservice/ApiService';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateBeforeSubmit()) {
      // toast.error('Please fix the validation errors before submitting.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    toast.promise(
      ApiService.post('/user/registration/', data,{
        headers: {'Content-Type': 'multipart/form-data'}
      }),
      {
        loading: 'Registering...',
        success: () => {
          navigate('/user-login');
          return 'Registration successfully!';
        },
        error: (error) => {
          let msg = "";
          console.log(error);
          if (error.response?.status === 400) {
            if (error.response.data.user_email) {
              msg = "Email Already Exist!";
            }
            if (error.response.data.user_mobile_no) {
              msg = "Mobile No Already Exist!";
            }
            toast.error(msg || 'Invalid data provided.');
          }
        },
      }
    );
  }


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
      "url('https://www.sysco.com/_next/image?url=https%3A%2F%2Fmediacdn.sysco.com%2Fimages%2Frendition%3Fid%3D494b40b36aa5b5e610afa292cba5eae7b9e18f95%26disp%3Dinline%26prid%3DDEFAULT&w=3840&q=75')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
    position: "relative"
  }}
>
  {/* Dark Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1
    }}
  ></div>

  {/* Registration Card */}
  <div
    className="p-4 bg-dark bg-opacity-75 rounded shadow"
    style={{
      width: "100%",
      maxWidth: "600px", // ✅ Increased from 420px to 600px
      zIndex: 2
    }}
  >
    <h1 className="text-center text-white mb-3">User Registration</h1>
    <form onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="mb-2">
        <label htmlFor="user_name" className="form-label text-white">
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
      <div className="mb-2">
        <label htmlFor="user_email" className="form-label text-white">
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
      <div className="mb-2">
        <label htmlFor="user_mobile_no" className="form-label text-white">
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
      <div className="mb-2">
        <label htmlFor="user_password" className="form-label text-white">
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
      <div className="mb-3">
        <label
          htmlFor="user_confirm_password"
          className="form-label text-white"
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

      {/* Redirect */}
      {/* <p className="text-center text-white mb-0" style={{ fontSize: "14px" }}>
        Already have an account?{" "}
        <a href="login.html" className="link-light">
          Login
        </a>
      </p> */}
    </form>
  </div>
</section>
</div>
        
  )
}

export default UserRegister
