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
            if (error.response.status === 401) throw new Error(error.response.data.detail);
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
  className="d-flex align-items-center justify-content-center"
  style={{
    minHeight: "100vh",
    backgroundColor: "#f8f9fa", // plain background
    padding: "20px",
  }}
>
  {/* Login Card */}
  <div
    className="card-body p-5 text-center text-white"
    style={{
      width: "100%",
      maxWidth: "600px" ,
      minHeight: "650px",
      borderRadius: "15px",
      position: "relative",
    }}
  >
    {/* Background Image inside the card */}
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
       filter: "brightness(0.9)", // no blur
       borderRadius: "20px",
       border: "2px solid rgba(255,255,255,0.6)",

        zIndex: 0,
      }}
    ></div>

    {/* Glass Layer with Centered Form */}
<div
  className="d-flex flex-column justify-content-center align-items-center text-center text-white"
  style={{
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",       
    maxWidth: "450px",   
    padding: "40px 30px",
  }}
>
  <h3 className="mb-4 fw-bold">User Login</h3>

  <form
    onSubmit={handleLogin}
    style={{ width: "100%" }}
  >
    <div className="mb-3 input-group">
      <span className="input-group-text bg-light">
        <i className="bi bi-envelope"></i>
      </span>
      <input
        type="email"
        name="user_email"
        value={formFields.user_email}
        onChange={handleChange}
        className="form-control form-control-lg"
        placeholder="Email Address"
        style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
        required
      />
    </div>
    <div className="mb-3 input-group">
      <span className="input-group-text bg-light">
        <i className="bi bi-lock"></i>
      </span>
      <input
        type="password"
        name="user_password"
        value={formFields.user_password}
        onChange={handleChange}
        className="form-control form-control-lg"
        placeholder="Password"
        style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
        required
      />
    </div>
    <button
      type="submit"
      className="btn btn-danger w-100 mb-3 fw-bold"
    >
      LOGIN
    </button>
    <p>Or login with</p>
    <div>
      <a href="#" className="btn btn-outline-primary btn-sm me-2">
        <i className="bi bi-facebook"></i>
      </a>
      <a href="#" className="btn btn-outline-danger btn-sm me-2">
        <i className="bi bi-google"></i>
      </a>
      <a href="#" className="btn btn-outline-info btn-sm">
        <i className="bi bi-twitter"></i>
      </a>
    </div>
  </form>
</div>

  </div>
</div>
</div>

  );
};

export default UserLogin;


