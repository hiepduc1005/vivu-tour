import React, { useState, useEffect } from 'react';
import { deleteTour, getTours } from '../service/TourApi';
import './ListTours.css';

const ListTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tour này không?')) {
      try {
        await deleteTour(id);
        setTours(tours.filter((tour) => tour.id !== id));
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa tour.');
      }
    }
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const toursData = await getTours();
        setTours(toursData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
        setError('Không thể tải danh sách tour.');
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tours-list">
      <h2 className="title">Tour List</h2>
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Location</th>
            <th>End Location</th>
            <th>Price</th>
            <th>Slots</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Schedule</th> {/* Thêm cột Schedule */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours && tours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.name}</td>
              <td>{tour.description}</td>
              <td>{tour.startLocation.name}</td>
              <td>{tour.endLocation.name}</td>
              <td>{tour.pricePerPerson}</td>
              <td>{tour.availableSlots}</td>
              <td>{tour.startDate}</td>
              <td>{tour.endDate}</td>
              {/* Hiển thị lịch trình */}
              <td>
                <ul>
                  {tour?.schedules?.map((item, index) => (
                    <li key={index}>
                      <strong>Ngày {item.day}:</strong> {item.activity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(tour.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTours;
