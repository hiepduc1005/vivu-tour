import React, { useState } from 'react';
import { createLocation } from '../service/LocationApi';
import '../css/AdminLocation.css';
import ListLocation from '../components/ListLocation';
import { Link } from 'react-router-dom';

const AdminLocation = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null, // Lưu file ảnh
  });

  const [locationCreated,setLocationCreated] = useState();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createLocation(formData); // Gọi API từ LocationApi.js
      setMessage('Location created successfully!');
      setLocationCreated(response);
      setError('');
      setFormData({ name: '', description: '', file: null });
      console.log('Created Location:', response);
    } catch (err) {
      setError('Failed to create location. Please try again.');
      setMessage('');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <div className="adminlocation-container">
        <h2>Create Location</h2>

        <div className="back-to-admin">
          <Link to="/admin" className="btn btn-back">
            &larr; Back to Admin Dashboard
          </Link>
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter location name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter location description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit">Create Location</button>
        </form>
      </div>
      <ListLocation locationCreated={locationCreated}></ListLocation>
    </>
  );
};

export default AdminLocation;
