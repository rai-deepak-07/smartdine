import { useContext, useEffect, useState } from "react";
import apiRestaurantService from "../../apiservice/apiRestaurantService";
import { useNavigate } from "react-router-dom";
import { ResturantContext } from "../../context/Context";
import { Link } from "react-router-dom";

const RestaurantLogin = () => {
  const navigate = useNavigate();
  const { isRestaurantLoggedIn, setIsRestaurantLoggedIn } =
    useContext(ResturantContext);

  // Use a single state object for form values
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
      alert("Please fill Username & Password");
    } else {
      try {
        // Note: endpoint should be just 'login/' if your backend is /login/
        const response = await apiRestaurantService.post("login/", {
          res_login_id,
          res_login_password,
        });

        const { access, refresh, res_reg_id } = response.data;
        localStorage.setItem("restaurant_access_token", access);
        localStorage.setItem("restaurant_refresh_token", refresh);
        localStorage.setItem("restaurant_res_reg_id", res_reg_id);

        setIsRestaurantLoggedIn(true);
        navigate("/restaurant");
      } catch (error) {
        console.error("Login failed:", error);
        if (error) {
          if (error.response) {
            if (error.response.status === 401) {
              alert("Invalid Username or Password");
            }
            if (error.response.status === 404) {
              alert("Invalid API Url");
            }
          } else {
            alert("Login Failed! Server Not Working");
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isRestaurantLoggedIn) {
      navigate("/restaurant");
    }
  }, [isRestaurantLoggedIn, navigate]);

  return (
    <div className=" min-vh-100 d-flex align-items-center">
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-10">
            <div className="card shadow p-4 rounded-5">
              <div className="row g-0">
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4 cl4">
                      Restaurant Login
                    </h2>
                    <p className="text-center text-muted mb-4">
                      Welcome back! Please login to your account
                    </p>

                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        {/* <label className="form-label">Restaurant Login ID</label> */}
                        <div className="input-group">
                          {/* <span className="input-group-text"><i className="fas fa-user"></i></span> */}
                          <input
                            type="text"
                            className="form-control form-control-lg rounded-5"
                            name="res_login_id"
                            maxLength={100}
                            value={formFields.res_login_id}
                            onChange={handleChange}
                            placeholder="Login ID"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        {/* <label className="form-label">Password</label> */}
                        <div className="input-group">
                          {/* <span className="input-group-text"><i className="fas fa-lock"></i></span> */}
                          <input
                            type="password"
                            className="form-control form-control-lg rounded-5"
                            name="res_login_password"
                            minLength={8}
                            maxLength={128}
                            value={formFields.res_login_password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                          />
                        </div>
                      </div>

                      <div className="text-end mb-4">
                        <Link to="/" className="text-decoration-none large cl4">
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
                    className="img-fluid rounded-start h-100 object-fit-cover"
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
