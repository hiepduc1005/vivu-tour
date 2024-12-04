import React, { useEffect, useState } from 'react';
import { getLocations, deleteLocation } from '../service/LocationApi'; // Assuming you have an API function to delete locations
import './ListLocation.css';

const ListLocation = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getLocations(token); // Fetch the locations
        setLocations(response); // Assume response contains the data
      } catch (err) {
        setError('Failed to fetch locations.');
        console.error('Error:', err);
      }
    };

    fetchLocations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Call delete function from API service
      await deleteLocation(id, token);
      // Update the state to remove the deleted location
      setLocations(locations.filter(location => location.id !== id));
    } catch (err) {
      setError('Failed to delete location.');
      console.error('Error:', err);
    }
  };

  const handleUpdate = (id) => {
    // Handle the update action (e.g., navigate to the update page or show a modal)
    console.log(`Update location with ID: ${id}`);
    // Example: Redirect to a location update page
    // history.push(`/update-location/${id}`);
  };

  return (
    <div className="listlocation-container">
      <h2>List of Locations</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="location-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.description}</td>
              <td>
                {location.imagePath && (
                  <img
                    src={`http://localhost:8080${location.imagePath}`}
                    alt={location.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                )}
              </td>
              <td>
                <button className='update' onClick={() => handleUpdate(location.id)}>Update</button>
                <button className='delete' onClick={() => handleDelete(location.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListLocation;
