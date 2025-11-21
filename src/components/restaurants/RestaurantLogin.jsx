import { useContext, useEffect, useState } from "react";
import ApiService from "../../apiservice/ApiService";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "../../context/Context";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import bgImg from '../../assets/image/user/kitchen-6878026.jpg';

const RestaurantLogin = () => {
  document.title = "Restaurant Login | SmartDine";
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(RestaurantContext); // Destructure login from context

  const [formFields, setFormFields] = useState({
    res_login_id: "",
    res_login_password: "",
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { res_login_id, res_login_password } = formFields;

    if (res_login_id === "" || res_login_password === "") {
      toast.error("Please fill Username & Password");
      return;
    }

    toast.promise(
      ApiService.post("restaurant/login/", { res_login_id, res_login_password })
        .then((response) => {
          const { access, refresh, user_id } = response.data;
          // Use context's login method to save tokens and update state
          login({ accessToken: access, refreshToken: refresh, user_id });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401)
              throw new Error("Invalid Username or Password");
            else if (error.response.status === 404)
              throw new Error("Invalid API Endpoint");
            else throw new Error("Login Failed! Server Error");
          } else {
            throw new Error("Login Failed! Server Not Working");
          }
        }),
      {
        loading: "Logging you in...",
        success: "Login successful!",
        error: (err) => err.message || "Unknown error",
      }
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/restaurant/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className='smartdine-banner' style={{ backgroundImage: `url(${bgImg})` }} id='restaurantLogin'>
        <div className="smartdine-overlay opacity-75"></div>
        <div className="position-relative z-1 w-100">
          <div className="container px-3">
            <div className="row">
              <div className="col-md-3"></div>

              {/* Restaurant Login Page */}
              <div className="col-md-6 p-md-5 px-4 py-5 shadow rounded smartdine-overlay position-relative">
                <div className="row cl5 mb-3 f2">
                  <span className="fs-3 fw-semibold">
                    <i className="bi bi-person-circle me-3"></i>
                    Restaurant <i className="cl1">Login</i>
                  </span>
                </div>

                <hr className='border-light border-1' />
                <p className="cl5 f2">
                  <b className="cl3">Welcome back!</b> Please login to your account
                </p>

                <div className="row f2">
                  {/* Login Form */}
                  <form onSubmit={handleLogin}>
                    <div className="my-3 input-group">
                      <span className="input-group-text text-muted">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="res_login_id"
                        maxLength={100}
                        value={formFields.res_login_id}
                        onChange={handleChange}
                        placeholder="Login ID"
                        required
                      />
                    </div>
                    <div className="my-3 input-group">
                      <span className="input-group-text text-muted">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="res_login_password"
                        minLength={8}
                        maxLength={128}
                        value={formFields.res_login_password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                    </div>

                    <div className="text-end mb-4">
                      <Link to="/forget-password" className="text-decoration-none fw-semibold cl5">
                        Forgot Password?
                      </Link>
                    </div>



                    <button type="submit" className="btn btn-danger w-100 mt-3">
                      <i className='bi bi-box-arrow-in-right me-2'></i>Login
                    </button>
                    <div className="d-flex mt-3 cl5">
                      <hr className="flex-grow-1" />
                    </div>

                    <div className="d-grid justify-content-center f2 mt-4">
                      <span className='cl5'>
                        Don't have an account?
                        <Link to="/restaurant-register" className='text-decoration-none mx-2 fw-semibold cl1'>
                          Register Now
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
    </>
  );
};

export default RestaurantLogin;
