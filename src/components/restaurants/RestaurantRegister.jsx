import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import apiRestaurantService from '../../apiservice/apiRestaurantService';
//import myFunction from "./Restaurant";

const RestaurantRegister = () => {

  const [formFields, setFormFields] = useState({
    res_name: '',
    res_address: '',
    res_contact_no: '',
    google_location_url: '',
    owner_name: '',
    owner_mobile_no: '',
    email: '',
    fssai_license_no: '',
    gst_registration_no: '',
    password: '',
  });

  const [fssaiPdf, setFssaiPdf] = useState(null);
  const [gstPdf, setGstPdf] = useState(null);
  const navigate = useNavigate();
//   useEffect(() => {
//    myFunction();
//   }, [])
  

  const handleChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFssaiPdfChange = (e) => {
    setFssaiPdf(e.target.files[0]);
  };

  const handleGstPdfChange = (e) => {
    setGstPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formFields).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (fssaiPdf) data.append('fssai_license_url', fssaiPdf);
    if (gstPdf) data.append('gst_registration_url', gstPdf);

    try {
        const response = await apiRestaurantService.post('registration/', 
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      // await axios.post(
      //   `${process.env.REACT_APP_BASE_API}restaurant/registration/`,
      //   data,
      //   { headers: { 'Content-Type': 'multipart/form-data' } }
      // );
      console.log(response.data);
      
      alert('Registration submitted successfully!');
      navigate('/restaurant-login');
    } catch (err) {
      console.error(err.response);
      alert('Error submitting registration!');
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>Restaurant Name:</label>
    //   <input
    //     type="text"
    //     name="res_name"
    //     maxLength={100}
    //     value={formFields.res_name}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>Restaurant Address:</label>
    //   <textarea
    //     name="res_address"
    //     value={formFields.res_address}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>Restaurant Contact No:</label>
    //   <input
    //     type="text"
    //     name="res_contact_no"
    //     maxLength={15}
    //     pattern="^\+?\d{10,15}$"
    //     value={formFields.res_contact_no}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>Google Location URL:</label>
    //   <input
    //     type="url"
    //     name="google_location_url"
    //     value={formFields.google_location_url}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>Owner Name:</label>
    //   <input
    //     type="text"
    //     name="owner_name"
    //     maxLength={100}
    //     value={formFields.owner_name}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>Owner Mobile No:</label>
    //   <input
    //     type="text"
    //     name="owner_mobile_no"
    //     maxLength={15}
    //     pattern="^\+?\d{10,15}$"
    //     value={formFields.owner_mobile_no}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>Email:</label>
    //   <input
    //     type="email"
    //     name="email"
    //     value={formFields.email}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>FSSAI License No:</label>
    //   <input
    //     type="text"
    //     name="fssai_license_no"
    //     maxLength={30}
    //     value={formFields.fssai_license_no}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>FSSAI License PDF:</label>
    //   <input
    //     type="file"
    //     accept="application/pdf"
    //     onChange={handleFssaiPdfChange}
    //     required
    //   />

    //   <label>GST Registration No:</label>
    //   <input
    //     type="text"
    //     name="gst_registration_no"
    //     maxLength={30}
    //     value={formFields.gst_registration_no}
    //     onChange={handleChange}
    //     required
    //   />

    //   <label>GST Registration PDF:</label>
    //   <input
    //     type="file"
    //     accept="application/pdf"
    //     onChange={handleGstPdfChange}
    //     required
    //   />

    //   <label>Password:</label>
    //   <input
    //     type="password"
    //     name="password"
    //     minLength={8}
    //     maxLength={128}
    //     value={formFields.password}
    //     onChange={handleChange}
    //     required
    //   />

    //   <button type="submit">Register</button>
    // </form>
    <div>
    <form onsubmit={handleSubmit} className="bg-light">
    <div className="position-fixed top-0 start-0 w-100 h-100" 
         style={{backgroundImage: "url('/wooden-table-blurred-japanese-restaurant-interior-background-empty-cafe-warm-light-cozy-atmosphere-design-traditional-culture-385724009.webp')", 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                zIndex: -1 }}>
    </div>

    <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    <div className="card-header bg-primary text-white text-center py-4 position-relative">
                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: "linearGradient(45deg, #0d6efd 0%, #0dcaf0 100%)", opacity: "0.9"}}></div>
                        <div className="position-relative z-1">
                            <h1 className="display-5 fw-bold mb-2"><i className="bi bi-building me-2"></i> Restaurant Registration</h1>
                            <p className="mb-0 lead">Complete all sections to register your restaurant</p>
                        </div>
                    </div>
                    
                    <div className="card-body p-0">
                        <div className="row g-0">
                            
                            <div className="col-md-4 border-end bg-light">
                                <div className="p-4">
                                    <div className="list-group border-0 rounded-3 overflow-hidden">
                                        <button to="/" className="list-group-item list-group-item-action active border-0 rounded-3 mb-2 shadow-sm" onclick="showSection('restaurant')">
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
                                        <button to="/" className="list-group-item list-group-item-action border-0 rounded-3 mb-2 shadow-sm" onclick="showSection('owner')">
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
                                        <button to="/" className="list-group-item list-group-item-action border-0 rounded-3 mb-2 shadow-sm" onclick="showSection('documents')">
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
                                        <div className="progress mb-2" style={{height: "10px;"}}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "33%", ariaValuenow :"33" ,ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                        </div>
                                        <p className="mb-0 small text-muted">Step 1 of 3 completed</p>
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
                            
                            
                            <div className="col-md-8">
                                <div className="p-4">
                                    
                                    <div id="restaurant-section">
                                        <h3 className="text-primary mb-4 border-bottom pb-2"><i className="bi bi-shop me-2"></i>Restaurant Details</h3>
                                        
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label fw-semibold">Restaurant Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-shop text-primary"></i></span>
                                                    <input type="text" className="form-control shadow-sm" placeholder="Enter restaurant name" name="res_name" maxlength={100} value={formFields.res_name} onchange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label fw-semibold">Restaurant Address</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-geo-alt text-primary"></i></span>
                                                    <input type="text" className="form-control shadow-sm" placeholder="Enter restaurant address" name="res_address" value={formFields.res_address} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Contact Number</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-telephone text-primary"></i></span>
                                                    <input type="text" className="form-control shadow-sm" placeholder="Enter contact number"  name="res_contact_no" maxLength={15} pattern="^\+?\d{10,15}$" value={formFields.res_contact_no} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Google Location URL</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-link-45deg text-primary"></i></span>
                                                    <input type="url" className="form-control shadow-sm" placeholder="Paste Google Maps URL" name="google_location_url" value={formFields.google_location_url} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Cuisine Type</label>
                                                <select className="form-select shadow-sm">
                                                    <option selected>Select cuisine type</option>
                                                    <option>Italian</option>
                                                    <option>Chinese</option>
                                                    <option>Mexican</option>
                                                    <option>Indian</option>
                                                    <option>American</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Seating Capacity</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-people text-primary"></i></span>
                                                    <input type="number" className="form-control shadow-sm" placeholder="Enter capacity"/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex justify-content-end mt-4">
                                            <button type="button" className="btn btn-primary rounded-pill px-4" onclick="showSection('owner')">
                                                Next: Owner Details <i className="bi bi-arrow-right ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                  
                                    <div id="owner-section" className="d-none">
                                        <h3 className="text-primary mb-4 border-bottom pb-2"><i className="bi bi-person-circle me-2"></i>Owner Details</h3>
                                        
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Owner Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-person text-primary"></i></span>
                                                    <input type="text" className="form-control shadow-sm" placeholder="Enter owner name" name="owner_name" maxLength={100} value={formFields.owner_name} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Mobile Number</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-phone text-primary"></i></span>
                                                    <input type="text" className="form-control shadow-sm" placeholder="Enter mobile number" name="owner_mobile_no" maxLength={15} pattern="^\+?\d{10,15}$" value={formFields.owner_mobile_no} onChange={handleChange} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label fw-semibold">Email Address</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-envelope text-primary"></i></span>
                                                    <input type="email" className="form-control shadow-sm" placeholder="Enter email address"name="email" value={formFields.email} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Date of Birth</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-calendar text-primary"></i></span>
                                                    <input type="date" className="form-control shadow-sm"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">ID Type</label>
                                                <select className="form-select shadow-sm">
                                                    <option selected>Select ID Type</option>
                                                    <option>Driver's License</option>
                                                    <option>Passport</option>
                                                    <option>National ID</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label fw-semibold">ID Number</label>
                                                <input type="text" className="form-control shadow-sm" placeholder="Enter ID number"/>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex justify-content-between mt-4">
                                            <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onclick="showSection('restaurant')">
                                                <i className="bi bi-arrow-left me-2"></i> Previous
                                            </button>
                                            <button type="button" className="btn btn-primary rounded-pill px-4" onclick="showSection('documents')">
                                                Next: Documents <i className="bi bi-arrow-right ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                   
                                    <div id="documents-section" className="d-none">
                                        <h3 className="text-primary mb-4 border-bottom pb-2"><i className="bi bi-file-earmark-text me-2"></i>Documents & Account</h3>
                                        
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">FSSAI License Number</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-upc-scan text-primary"></i></span>
                                                    <input type="text" className="form-control shadow-sm" placeholder="Enter FSSAI license number" name="fssai_license_no" maxLength={30} value={formFields.fssai_license_no} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">FSSAI License PDF</label>
                                                <div className="input-group">
                                                    <input type="file" className="form-control shadow-sm" accept="application/pdf" onChange={handleFssaiPdfChange} required />
                                                </div>
                                                <small className="text-muted">Upload your FSSAI license document</small>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">GST Registration Number</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-upc-scan text-primary"></i></span>
                                                    <input type="text" className="form-control shadow-sm" placeholder="Enter GST registration number" name="gst_registration_no" maxLength={30} value={formFields.gst_registration_no} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">GST Registration PDF</label>
                                                <div className="input-group">
                                                    <input type="file" className="form-control shadow-sm" accept="application/pdf" onChange={handleGstPdfChange} required />
                                                </div>
                                                <small className="text-muted">Upload your GST registration document</small>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Create Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-lock text-primary"></i></span>
                                                    <input type="password" className="form-control shadow-sm" placeholder="Create a password" name="password" minLength={8} maxLength={128} value={formFields.password} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Confirm Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light"><i className="bi bi-lock text-primary"></i></span>
                                                    <input type="password" className="form-control shadow-sm" placeholder="Confirm your password" />
                                                </div>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="termsCheck"/>
                                                    <label className="form-check-label" for="termsCheck">
                                                        I agree to the terms and conditions
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex justify-content-between mt-4">
                                            <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onclick="showSection('owner')">
                                                <i className="bi bi-arrow-left me-2"></i> Previous
                                            </button>
                                            <button type="button" className="btn btn-success rounded-pill px-4">
                                                <i className="bi bi-check-circle me-2"></i> Submit Registration
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-footer text-center text-muted py-3 bg-light">
                        <p className="mb-0">Already have an account? <Link to="/" className="text-decoration-none fw-semibold">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </form>
  </div>

  );
};

export default RestaurantRegister;
