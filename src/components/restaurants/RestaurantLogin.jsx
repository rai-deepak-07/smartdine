import { useContext, useEffect, useState } from "react";
import ApiService from "../../apiservice/ApiService";
import { useNavigate } from "react-router-dom";
import { ResturantContext } from "../../context/Context";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const RestaurantLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(ResturantContext); // Destructure login from context

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
      navigate("/restaurant");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className=" min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-10">
            <div className="card shadow p-4 border rounded-2">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-5 py-md-5">
                  <div className="card-body p-4">
                    <h1 className="card-title text-center mb-4 cl4">
                      Restaurant Login
                    </h1>

                    <p className="text-center text-muted mb-4">
                      Welcome back! Please login to your account
                    </p>

                    {/* Login Form */}
                    <form onSubmit={handleLogin}>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-5 mt-2 mb-4"
                        name="res_login_id"
                        maxLength={100}
                        value={formFields.res_login_id}
                        onChange={handleChange}
                        placeholder="Login ID"
                        required
                      />

                      <input
                        type="password"
                        className="form-control form-control-lg rounded-5 mt-2 mb-4"
                        name="res_login_password"
                        minLength={8}
                        maxLength={128}
                        value={formFields.res_login_password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />

                      <div className="text-end mb-4">
                        <Link
                          to="/"
                          className="text-decoration-none fw-semibold cl4"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <div className="d-grid mb-3">
                        <button
                          type="submit"
                          className="btn btn-lg btn-dark rounded-4 rounded-5"
                        >
                          Login
                        </button>
                      </div>

                      <div className="d-flex align-items-center my-4">
                        <hr className="flex-grow-1" />
                        <span className="px-2 small text-muted">
                          or continue with
                        </span>
                        <hr className="flex-grow-1" />
                      </div>

                      {/* Social Login Buttons */}
                      <div className="d-grid mb-3">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100 "
                        >
                          <i className="fab fa-google me-2"></i> Google
                        </button>
                      </div>

                      <div className="d-grid mb-3">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100"
                        >
                          <i className="fab fa-facebook-f me-2"></i> Facebook
                        </button>
                      </div>

                      <div className="text-center mt-5">
                        <p className="mb-0">
                          Don't have an account?{" "}
                          <Link
                            to="/restaurant-register"
                            className="text-danger text-decoration-none"
                          >
                            Register Now
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-5 d-none d-md-block ">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Restaurant Interior"
                    className="img-fluid rounded-3 h-100 object-fit-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;
