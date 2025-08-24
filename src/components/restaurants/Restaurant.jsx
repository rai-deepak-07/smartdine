import React from 'react'

const Restaurant = () => {
  return (
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
            <input type="text" className="form-control shadow-sm" placeholder="Enter contact number" name="res_contact_no" maxLength={15} pattern="^\+?\d{10,15}$" value={formFields.res_contact_no} onChange={handleChange} required />
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
            <input type="number" className="form-control shadow-sm" placeholder="Enter capacity" />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button type="button" className="btn btn-primary rounded-pill px-4" onclick="showSection('owner')">
          Next: Owner Details <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </div>
  )
}

export default Restaurant
