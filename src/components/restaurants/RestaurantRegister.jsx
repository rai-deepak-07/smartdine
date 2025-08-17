import axios from 'axios';
import React, { useState } from 'react';

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
      await axios.post(
        'http://127.0.0.1:8000/api/smartdine/restaurant/registration/',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Registration submitted successfully!');
    } catch (err) {
      console.error(err.response);
      alert('Error submitting registration!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Restaurant Name:</label>
      <input
        type="text"
        name="res_name"
        maxLength={100}
        value={formFields.res_name}
        onChange={handleChange}
        required
      />

      <label>Restaurant Address:</label>
      <textarea
        name="res_address"
        value={formFields.res_address}
        onChange={handleChange}
        required
      />

      <label>Restaurant Contact No:</label>
      <input
        type="text"
        name="res_contact_no"
        maxLength={15}
        pattern="^\+?\d{10,15}$"
        value={formFields.res_contact_no}
        onChange={handleChange}
        required
      />

      <label>Google Location URL:</label>
      <input
        type="url"
        name="google_location_url"
        value={formFields.google_location_url}
        onChange={handleChange}
        required
      />

      <label>Owner Name:</label>
      <input
        type="text"
        name="owner_name"
        maxLength={100}
        value={formFields.owner_name}
        onChange={handleChange}
        required
      />

      <label>Owner Mobile No:</label>
      <input
        type="text"
        name="owner_mobile_no"
        maxLength={15}
        pattern="^\+?\d{10,15}$"
        value={formFields.owner_mobile_no}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formFields.email}
        onChange={handleChange}
        required
      />

      <label>FSSAI License No:</label>
      <input
        type="text"
        name="fssai_license_no"
        maxLength={30}
        value={formFields.fssai_license_no}
        onChange={handleChange}
        required
      />

      <label>FSSAI License PDF:</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFssaiPdfChange}
        required
      />

      <label>GST Registration No:</label>
      <input
        type="text"
        name="gst_registration_no"
        maxLength={30}
        value={formFields.gst_registration_no}
        onChange={handleChange}
        required
      />

      <label>GST Registration PDF:</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleGstPdfChange}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        minLength={8}
        maxLength={128}
        value={formFields.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RestaurantRegister;
