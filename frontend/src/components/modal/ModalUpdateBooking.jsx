import React, { useState, useEffect } from 'react';
import './ModalUpdateBooking.css'; // Add your custom CSS file here

const ModalUpdateBooking = ({ show, handleClose, bookingData, handleUpdate }) => {
  const [formData, setFormData] = useState({
    numPeople: '',
    additionalRequest: '',
    status: '',
    email: '',
    username: '',
    phone: ''
  });

  // When modal opens and receives bookingData, set the form data
  useEffect(() => {
    if (bookingData) {
      setFormData({
        numPeople: bookingData.numPeople || '',
        additionalRequest: bookingData.additionalRequest || '',
        status: bookingData.status || '',
        email: bookingData.email || '',
        username: bookingData.username || '',
        phone: bookingData.phone || ''
      });
    }
  }, [bookingData]);

  // Handle change in input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleUpdate) {
      handleUpdate(formData); // Send updated data
    }
    handleClose(); // Close the modal after submitting
  };


  if (!show) return null; // If modal is not to be shown, return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Update Booking</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="numPeople">Number of People</label>
            <input
              type="number"
              id="numPeople"
              name="numPeople"
              value={formData.numPeople}
              onChange={handleChange}
              placeholder="Enter number of people"
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalRequest">Additional Request</label>
            <input
              type="text"
              id="additionalRequest"
              name="additionalRequest"
              value={formData.additionalRequest}
              onChange={handleChange}
              placeholder="Enter additional request"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Comfirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Canceled</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-submit">Update Booking</button>
            <button className="cancel-button" onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateBooking;
