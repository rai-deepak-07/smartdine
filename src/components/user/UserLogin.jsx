import React, { useState, useContext, useEffect } from 'react';
import ApiService from '../../apiservice/ApiService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import bgImg from '../../assets/image/user/kitchen-6878026.jpg'
// import bgImg from '../../assets/image/user/restaurant-1090136.jpg'
// import bgImg from '../../assets/image/user/outdoor-dining-1846137.jpg'

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

    <div className='smartdine-banner' style={{ backgroundImage: `url(${bgImg})` }} id='userlogin'>
      <div className="smartdine-overlay opacity-75"></div>
      <div className="position-relative z-1 w-100">
        <div className="container px-3">
          <div className="row">
            <div className="col-md-3"></div>

            {/* User Login Page */}
            <div className="col-md-6 p-md-5 px-4 py-5 shadow rounded smartdine-overlay position-relative">
              <div className="row cl5 mb-3">
                <span className="fs-2 fw-semibold f5">
                  <i className="bi bi-person-circle me-3"></i>
                  User Login
                </span>
              </div>

              <hr className='border-light border-1' />

              <div className="row">
                <form onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="my-3 input-group">
                    <span className="input-group-text fs-5 text-muted">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="user_email"
                      value={formFields.user_email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="my-3 input-group">
                    <span className="input-group-text fs-5 text-muted">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      name="user_password"
                      value={formFields.user_password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className='d-grid justify-content-end'>
                    <Link to="/" className='text-decoration-none fw-semibold cl5'>Forget Password?</Link>
                  </div>

                  <button type="submit" className="btn btn-danger w-100 mt-3">
                    <i className='bi bi-box-arrow-in-right me-2'></i>Login
                  </button>

                  <div className="d-flex align-items-center my-4 cl5">
                    <hr className="flex-grow-1" />
                    <span className="px-2">
                      or continue with
                    </span>
                    <hr className="flex-grow-1" />
                  </div>

                  {/* Social Login  */}
                  <div className='d-flex justify-content-between'>
                    <Link to="#" className="btn btn-outline-light w-50 mx-2">
                      <i className="bi bi-facebook fs-5"></i>
                    </Link >
                    <Link to="#" className="btn btn-outline-light w-50 mx-2">
                      <i className="bi bi-google fs-5"></i>
                    </Link >
                    <Link to="#" className="btn btn-outline-light w-50 mx-2">
                      <i className="bi bi-twitter fs-5"></i>
                    </Link >
                  </div>

                  {/* <hr className='border-light mt-5' /> */}
                  <div className="d-grid justify-content-center mt-5">
                    <span className='cl5'>
                      Don't have an account?
                      <Link to="/user-register" className='text-decoration-none mx-2 fw-semibold cl1'>
                        Register
                      </Link>
                    </span>
                  </div>

                </form>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserLogin;