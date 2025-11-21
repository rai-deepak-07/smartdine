import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import bgImg from "../../assets/image/user/kitchen-6878026.jpg";
import { MainContext } from "../../context/Context";
// import "./RestaurantRegister.css";

const RestaurantReg = () => {
  document.title = "Restaurant Register | SmartDine";

  const [formFields, setFormFields] = useState({
    res_name: "",
    res_address: "",
    res_contact_no: "",
    google_location_url: "",
    state: "",
    city: "",
    owner_name: "",
    owner_mobile_no: "",
    email: "",
    fssai_license_no: "",
    gst_registration_no: "",
    password: "",
    confirm_password: "",
    terms_accepted: false,
  });

  const { locations, getLocations } = useContext(MainContext);
  const [cities, setCities] = useState([]);
  const [fssaiPdf, setFssaiPdf] = useState(null);
  const [gstPdf, setGstPdf] = useState(null);
  const [activeSection, setActiveSection] = useState("restaurant");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "state") {
      const selectedState = locations.find((loc) => loc.name === value);
      setCities(selectedState ? selectedState.cities : []);
      setFormFields((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleFssaiPdfChange = (e) => {
    setFssaiPdf(e.target.files[0]);
  };

  const handleGstPdfChange = (e) => {
    setGstPdf(e.target.files[0]);
  };

  const getProgress = () => {
    switch (activeSection) {
      case "restaurant":
        return 33;
      case "owner":
        return 66;
      case "documents":
        return 100;
      default:
        return 0;
    }
  };

  const getProgressText = () => {
    switch (activeSection) {
      case "restaurant":
        return "Step 1 of 3 completed";
      case "owner":
        return "Step 2 of 3 completed";
      case "documents":
        return "Step 3 of 3 completed";
      default:
        return "";
    }
  };

  const nextSection = () => {
    if (activeSection === "restaurant") setActiveSection("owner");
    else if (activeSection === "owner") setActiveSection("documents");
  };

  const prevSection = () => {
    if (activeSection === "documents") setActiveSection("owner");
    else if (activeSection === "owner") setActiveSection("restaurant");
  };

  const validateBeforeSubmit = () => {
    if (formFields.password !== formFields.confirm_password) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!formFields.terms_accepted) {
      toast.error("You must accept the terms and conditions.");
      return false;
    }
    return true;
  };

  const isRestaurantSectionValid = () =>
    formFields.res_name.trim() !== "" &&
    formFields.res_address.trim() !== "" &&
    formFields.res_contact_no.trim() !== "" &&
    formFields.google_location_url.trim() !== "" &&
    formFields.state.trim() !== "" &&
    formFields.city.trim() !== "";

  const isOwnerSectionValid = () =>
    formFields.owner_name.trim() !== "" &&
    formFields.owner_mobile_no.trim() !== "" &&
    formFields.email.trim() !== "";

  const isDone = () =>
    !formFields.password ||
    !formFields.confirm_password ||
    !formFields.terms_accepted;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBeforeSubmit()) return;

    const data = new FormData();
    Object.entries(formFields).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (fssaiPdf) data.append("fssai_license_url", fssaiPdf);
    if (gstPdf) data.append("gst_registration_url", gstPdf);

    const otp = Math.floor(10000 + Math.random() * 90000).toString();

    toast.promise(
      emailjs.send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        process.env.REACT_APP_USER_OTP_TEMPLATE_ID,
        {
          to_email: formFields.email,
          otp: otp,
        },
        process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
      ),
      {
        loading: "Sending OTP...",
        success: () => {
          navigate("/otp-verification", {
            state: { data: Object.fromEntries(data), otp, type: "restaurant" },
          });
          return "OTP sent to your email!";
        },
        error: (err) => {
          console.error("EmailJS error:", err);
          return "Failed to send OTP. Try again!";
        },
      }
    );
  };

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <div className="smartdine-banner" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="smartdine-overlay"></div>
      <div className="position-relative z-1 w-100">
        <div className="container px-3">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 p-md-5 px-4 py-5 shadow rounded smartdine-overlay position-relative">
              <div className="border-0 rounded-0 overflow-hidden">
                
                <div className="cl5 text-center pb-4 position-relative">
                  <div className="position-relative z-1">
                    <h3 className="fw-bold fs-3 mb-2">
                      <i className="bi bi-building me-2"></i> Restaurant Registration
                    </h3>
                    <p className="mb-0">Complete all sections to register your restaurant</p>
                  </div>
                </div>

                <div className="card-body p-0">
                  <div className="row g-0">
                    {/* Sidebar */}
                    <div className="col-md-4 border-end">
                      <div className="p-4">
                        <div className="list-group border-0 rounded-3 overflow-hidden">
                          <button
                            className={`list-group-item list-group-item-action ${
                              activeSection === "restaurant" ? "active" : ""
                            } border-0 rounded-3 mb-2 shadow-sm`}
                            onClick={() => setActiveSection("restaurant")}
                          >
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle p-2 me-3">
                                <i className="bi bi-shop text-white"></i>
                              </div>
                              <div>
                                <h5 className="mb-0">Restaurant Details</h5>
                                <small>Business information</small>
                              </div>
                            </div>
                          </button>

                          <button
                            className={`list-group-item list-group-item-action ${
                              activeSection === "owner" ? "active" : ""
                            } border-0 rounded-3 mb-2 shadow-sm`}
                            onClick={() => {
                              if (!isRestaurantSectionValid()) {
                                toast.error("Please fill all Restaurant Details before continuing.");
                                return;
                              }
                              setActiveSection("owner");
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <div className="bg-secondary rounded-circle p-2 me-3">
                                <i className="bi bi-person-circle text-white"></i>
                              </div>
                              <div>
                                <h5 className="mb-0">Owner Details</h5>
                                <small>Personal information</small>
                              </div>
                            </div>
                          </button>

                          <button
                            className={`list-group-item list-group-item-action ${
                              activeSection === "documents" ? "active" : ""
                            } border-0 rounded-3 mb-2 shadow-sm`}
                            onClick={() => {
                              if (!isRestaurantSectionValid() || !isOwnerSectionValid()) {
                                toast.error("Please fill all required fields in previous steps before continuing.");
                                return;
                              }
                              setActiveSection("documents");
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <div className="bg-success rounded-circle p-2 me-3">
                                <i className="bi bi-file-earmark-text text-white"></i>
                              </div>
                              <div>
                                <h5 className="mb-0">Documents & Account</h5>
                                <small>Licenses and security</small>
                              </div>
                            </div>
                          </button>
                        </div>

                        <div className="mt-4 p-3 bg-white rounded-3 shadow-sm">
                          <h6 className="border-bottom pb-2 text-primary">Registration Progress</h6>
                          <div className="progress mb-2" style={{ height: "10px" }}>
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              style={{ width: `${getProgress()}%` }}
                              aria-valuenow={getProgress()}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <p className="mb-0 small text-muted">{getProgressText()}</p>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="d-grid gap-2">
                            <button className="btn btn-outline-primary rounded-pill" type="button">
                              <i className="bi bi-question-circle me-2"></i> Need Help?
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Section */}
                    <div className="col-md-8">
                      <div className="p-4">
                        <form onSubmit={handleSubmit} method="post">
                          {/* Restaurant Details Section */}
                          {activeSection === "restaurant" && (
                            <div id="restaurant-section">
                              <h3 className="text-primary mb-4 border-bottom pb-2">
                                <i className="bi bi-shop me-2"></i>Restaurant Details
                              </h3>

                              <div className="row">
                                <div className="col-md-12 mb-3">
                                  <label className="form-label fw-semibold">Restaurant Name</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-shop text-primary"></i>
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control shadow-sm"
                                      placeholder="Enter restaurant name"
                                      name="res_name"
                                      maxLength={100}
                                      value={formFields.res_name}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                  <label className="form-label fw-semibold">Restaurant Address</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-geo-alt text-primary"></i>
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control shadow-sm"
                                      placeholder="Enter restaurant address"
                                      name="res_address"
                                      value={formFields.res_address}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">Contact Number</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-telephone text-primary"></i>
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control shadow-sm"
                                      placeholder="Enter contact number"
                                      name="res_contact_no"
                                      maxLength={15}
                                      pattern="^\+?\d{10,15}$"
                                      value={formFields.res_contact_no}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">Google Location URL</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-link-45deg text-primary"></i>
                                    </span>
                                    <input
                                      type="url"
                                      className="form-control shadow-sm"
                                      placeholder="Paste Google Maps URL"
                                      name="google_location_url"
                                      value={formFields.google_location_url}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">State</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-geo text-primary"></i>
                                    </span>
                                    <select
                                      className="form-select shadow-sm"
                                      name="state"
                                      value={formFields.state}
                                      onChange={handleChange}
                                      required
                                    >
                                      <option value="">Select state</option>
                                      {locations.map((loc) => (
                                        <option key={loc.id} value={loc.name}>
                                          {loc.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">City</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-building text-primary"></i>
                                    </span>
                                    <select
                                      className="form-select shadow-sm"
                                      name="city"
                                      value={formFields.city}
                                      onChange={handleChange}
                                      required
                                      disabled={!formFields.state}
                                    >
                                      <option value="">Select city</option>
                                      {cities.map((city) => (
                                        <option key={city.id} value={city.name}>
                                          {city.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex justify-content-end mt-4">
                                <button
                                  type="button"
                                  className="btn btn-primary rounded-pill px-4"
                                  onClick={nextSection}
                                  disabled={!isRestaurantSectionValid()}
                                >
                                  Next: Owner Details <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Owner Details Section */}
                          {activeSection === "owner" && (
                            <div id="owner-section">
                              <h3 className="text-primary mb-4 border-bottom pb-2">
                                <i className="bi bi-person-circle me-2"></i>Owner Details
                              </h3>

                              <div className="row">
                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">Owner Name</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-person text-primary"></i>
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control shadow-sm"
                                      placeholder="Enter owner name"
                                      name="owner_name"
                                      maxLength={100}
                                      value={formFields.owner_name}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">Mobile Number</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-phone text-primary"></i>
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control shadow-sm"
                                      placeholder="Enter mobile number"
                                      name="owner_mobile_no"
                                      maxLength={15}
                                      pattern="^\+?\d{10,15}$"
                                      value={formFields.owner_mobile_no}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                  <label className="form-label fw-semibold">Email Address</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-envelope text-primary"></i>
                                    </span>
                                    <input
                                      type="email"
                                      className="form-control shadow-sm"
                                      placeholder="Enter email address"
                                      name="email"
                                      value={formFields.email}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex justify-content-between mt-4">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary rounded-pill px-4"
                                  onClick={prevSection}
                                >
                                  <i className="bi bi-arrow-left me-2"></i> Previous
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary rounded-pill px-4"
                                  onClick={nextSection}
                                  disabled={!isOwnerSectionValid()}
                                >
                                  Next: Documents <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Documents Section */}
                          {activeSection === "documents" && (
                            <div id="documents-section">
                              <h3 className="text-primary mb-4 border-bottom pb-2">
                                <i className="bi bi-file-earmark-text me-2"></i>Documents & Account
                              </h3>

                              <div className="row">
                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">FSSAI License Number</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-upc-scan text-primary"></i>
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control shadow-sm"
                                      placeholder="Enter FSSAI license number"
                                      name="fssai_license_no"
                                      maxLength={30}
                                      value={formFields.fssai_license_no}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">FSSAI License PDF</label>
                                  <div className="input-group">
                                    <input
                                      type="file"
                                      className="form-control shadow-sm"
                                      accept="application/pdf"
                                      onChange={handleFssaiPdfChange}
                                      required
                                    />
                                  </div>
                                  <small className="text-muted">Upload your FSSAI license document</small>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">GST Registration Number</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-upc-scan text-primary"></i>
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control shadow-sm"
                                      placeholder="Enter GST registration number"
                                      name="gst_registration_no"
                                      maxLength={30}
                                      value={formFields.gst_registration_no}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">GST Registration PDF</label>
                                  <div className="input-group">
                                    <input
                                      type="file"
                                      className="form-control shadow-sm"
                                      accept="application/pdf"
                                      onChange={handleGstPdfChange}
                                      required
                                    />
                                  </div>
                                  <small className="text-muted">Upload your GST registration document</small>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">Create Password</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-lock text-primary"></i>
                                    </span>
                                    <input
                                      type="password"
                                      className="form-control shadow-sm"
                                      placeholder="Create a password"
                                      name="password"
                                      minLength={8}
                                      maxLength={128}
                                      value={formFields.password}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                  <label className="form-label fw-semibold">Confirm Password</label>
                                  <div className="input-group">
                                    <span className="input-group-text bg-light">
                                      <i className="bi bi-lock text-primary"></i>
                                    </span>
                                    <input
                                      type="password"
                                      className="form-control shadow-sm"
                                      name="confirm_password"
                                      placeholder="Confirm your password"
                                      minLength={8}
                                      maxLength={128}
                                      value={formFields.confirm_password}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-12 mb-3">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="termsCheck"
                                      name="terms_accepted"
                                      checked={formFields.terms_accepted}
                                      onChange={handleChange}
                                      required
                                    />
                                    <label className="form-check-label" htmlFor="termsCheck">
                                      I agree to the terms and conditions
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex justify-content-between mt-4">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary rounded-pill px-4"
                                  onClick={prevSection}
                                >
                                  <i className="bi bi-arrow-left me-2"></i> Previous
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success rounded-pill px-4"
                                  disabled={isDone()}
                                >
                                  <i className="bi bi-check-circle me-2"></i> Submit Registration
                                </button>
                              </div>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer text-center text-muted py-3 bg-light">
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/restaurant-login" className="text-decoration-none fw-semibold">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReg;