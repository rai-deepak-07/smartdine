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
    // <div>
    //   <h1>User Registration</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="user_name">Name:</label>
    //     <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />

    //     <label htmlFor="user_email">Email:</label>
    //     <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required />

    //     <label htmlFor="user_mobile_no">Mobile No:</label>
    //     <input type="tel" name="user_mobile_no" value={formData.user_mobile_no} onChange={handleChange} required />

    //     <label htmlFor="user_password">Password:</label>
    //     <input type="password" name="user_password" value={formData.user_password} onChange={handleChange}
    //     minLength={8} maxLength={30} required />

    //     <label htmlFor="user_confirm_password">Confirm Password:</label>
    //     <input type="password" name="user_confirm_password" value={formData.user_confirm_password} onChange={handleChange} minLength={8} maxLength={30} required />

    //     <button type='submit'>Register</button>

    //   </form>
  
    // </div>
        <section
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat"
      }}
    >
      <div
        className="bg-dark bg-opacity-75 p-2 rounded shadow"
        style={{ width: "100%", maxWidth: "380px" }}
      >
        {/* <h5 className="text-center text-white mb-2">Create Account</h5>
        <form onSubmit={handleSubmit}>
         
          <div className="mb-1">
            <label htmlFor="user_name" className="form-label text-white">
              Full Name
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

        
          <div className="mb-1">
            <label htmlFor="user_email" className="form-label text-white">
              Email
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

        
          <div className="mb-1">
            <label htmlFor="user_mobile_no" className="form-label text-white">
              Mobile
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

          <div className="mb-1">
            <label htmlFor="user_password" className="form-label text-white">
              Password
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

         
          <div className="mb-1">
            <label
              htmlFor="user_confirm_password"
              className="form-label text-white"
            >
              Confirm Password
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

        
          <div className="d-grid mb-1">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div> */}
           
       <h1>User Registration</h1>
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

    
  
    

          {/* Redirect */}
          <p className="text-center text-white mb-0" style={{ fontSize: "13px" }}>
            Already have an account?{" "}
            <a href="login.html" className="link-light">
              Login
            </a>
          </p>
        </form>
        </div>
    </section>
  )
}

export default UserRegister
