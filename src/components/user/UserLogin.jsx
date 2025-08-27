import React, { useState, useContext, useEffect } from 'react';
import ApiService from '../../apiservice/ApiService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import toast from 'react-hot-toast';

const UserLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(UserContext);

  const [formFields, setFormFields] = useState({
    user_email: '',
    user_password: '',
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user_email, user_password } = formFields;

    if (!user_email || !user_password) {
      toast.error('Please fill Email & Password');
      return;
    }

    toast.promise(
      ApiService.post('user/login/', { user_email, user_password })
        .then((response) => {
          const { access, refresh, user_id } = response.data;
          login({ accessToken: access, refreshToken: refresh, user_id });
          navigate('/user');
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) throw new Error('Invalid Username or Password');
            else if (error.response.status === 404) throw new Error('Invalid API URL');
            else throw new Error('Login Failed! Server Error');
          } else {
            throw new Error('Login Failed! Server Not Working');
          }
        }),
      {
        loading: 'Logging you in...',
        success: 'Login successful!',
        error: (err) => String(err.message || err) || 'Unknown error',
      }
    );

  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {/* <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="user_email"
          maxLength={100}
          value={formFields.user_email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="user_password"
          minLength={8}
          maxLength={128}
          value={formFields.user_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form> */}
  
<div
  className="d-flex align-items-center justify-content-center vh-100"
  style={{ backgroundColor: "#f8f9fa" }} // optional page background
>
  <div
    className="card rounded-4 shadow-lg overflow-hidden position-relative w-100"
    style={{ maxWidth: "850px", maxHeight: "95vh" }}
  >
    {/* Full blurred background inside card */}
    <div className="position-absolute top-0 start-0 w-100 h-100">
      <img
        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
        className="w-100 h-100 object-fit-cover"
        style={{ filter: "blur(10px)", transform: "scale(1.1)" }}
        alt="Background"
      />
      {/* Glass effect overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)" }}
      ></div>
    </div>

    {/* Card Content */}
    <div className="row g-0 position-relative h-100" style={{ zIndex: 2 }}>
      {/* Left Image */}
      <div className="col-md-5 d-none d-md-block position-relative p-3">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
          className="img-fluid rounded-3 w-100 h-100 object-fit-cover shadow-lg"
          alt="Restaurant"
        />
      </div>

      {/* Right Form Section */}
      <div className="col-md-7 d-flex flex-column justify-content-center p-4">
        <h2 className="text-center mb-2 text-dark fw-bold">Create Account</h2>
        <p className="text-center mb-3 text-dark">
          Sign up with your email and password
        </p>

        <form onSubmit={handleLogin}>
           <label><h5>Username:</h5></label>
          <div className="mb-2">
            <input
              type="text"
              className="form-control bg-light bg-opacity-50 text-dark"
              required
            />
          </div>
          <label><h5>Email:</h5></label>
          <div className="mb-2">
            {/* <input
              type="email"
              className="form-control bg-light bg-opacity-50 text-dark"
              placeholder="Email"
              required
            /> */}
             <input
             className="form-control bg-light bg-opacity-50 text-dark"
          type="email"
          name="user_email"
          maxLength={100}
          value={formFields.user_email}
          onChange={handleChange}
          required
        />
          </div>
           <label><h5>Password:</h5></label>
           <div className="mb-2">
            {/* <input
              type="password"
              className="form-control bg-light bg-opacity-50 text-dark"
              placeholder="Password"
              required
            /> */}
        <input
         className="form-control bg-light bg-opacity-50 text-dark"
          type="password"
          name="user_password"
          minLength={8}
          maxLength={128}
          value={formFields.user_password}
          onChange={handleChange}
          required
        />
          </div>
           <label><h5>Confirm Password:</h5></label>
           <div className="mb-2">
            {/* <input
              type="password"
              className="form-control bg-light bg-opacity-50 text-dark"
              placeholder="Confirm Password"
              required
            /> */}
        <input
        className="form-control bg-light bg-opacity-50 text-dark"
          type="password"
          name="user_password"
          minLength={8}
          maxLength={128}
          value={formFields.user_password}
          onChange={handleChange}
          required
        />
          </div>

          <div className="d-grid mb-2 mt-3">
            <button type="submit" className="btn btn-dark btn-lg rounded-4">
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mb-2 text-dark">
          <span>or sign up with</span>
        </div>

        <div className="d-grid gap-2 mb-3">
          <button type="button" className="btn btn-outline-dark btn-lg">
            <i className="bi bi-google me-2"></i>Google
          </button>
          <button type="button" className="btn btn-outline-dark btn-lg">
            <i className="bi bi-facebook me-2"></i>Facebook
          </button>
        </div>

        <div className="text-center text-dark">
          <p className="mb-0">
            Already have an account?{" "}
            <a href="/" className="text-decoration-none">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>





  );
};

export default UserLogin;
