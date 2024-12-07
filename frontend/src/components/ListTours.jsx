import React, { useState, useEffect } from 'react';
import { deleteTour, getTours, updateTour } from '../service/TourApi';
import './ListTours.css';
import ModalUpdateTour from './modal/ModalUpdateTour';
import dayjs from 'dayjs';

const ListTours = ({locations}) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedTour) => {
    let { endLocation, startLocation, schedules, schedule, id, ...tourDataUpdate } = updatedTour;

    const tourUpdated = await updateTour(id,tourDataUpdate)
    if(tourUpdated){
      setTours((prev) =>
        prev.map((tour) => (tour.id === tourUpdated.id ? tourUpdated : tour))
      );
    }
    console.log(tourUpdated)
  };

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
                <button className="btn btn-edit" onClick={() => handleEdit(tour)}>Edit</button>
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
      <ModalUpdateTour
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourData={selectedTour}
        onUpdate={handleUpdate}
        locations={locations}
      />
    </div>
  );
};

export default ListTours;
