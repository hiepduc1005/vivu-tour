import React, { useEffect, useState } from 'react';
import '../css/AdminBooking.css';
import { deleteBooking, getBookings, updateBooking } from '../service/BookingApi';
import ModalUpdateBooking from '../components/modal/ModalUpdateBooking';
import { Link } from 'react-router-dom';

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null); // Booking được chọn để cập nhật
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [loading, setLoading] = useState(false); // Trạng thái loading khi cập nhật

  // Lấy danh sách booking từ API
  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    try {
      const bookingDatas = await getBookings(token);
      if (bookingDatas) {
        setBookings(bookingDatas);
        setFilteredBookings(bookingDatas); // Hiển thị tất cả dữ liệu ban đầu
      }
    } catch (error) {
      window.location = window.location.origin + '/signin';
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Hàm tìm kiếm
  const handleSearch = () => {
    let filtered = bookings;

    if (searchStatus) {
      filtered = filtered.filter(
        (booking) => booking.status.toLowerCase() === searchStatus.toLowerCase()
      );
    }

    if (searchDate) {
      const selectedDate = new Date(searchDate).toDateString();
      filtered = filtered.filter(
        (booking) => new Date(booking.createdAt).toDateString() === selectedDate
      );
    }

    setFilteredBookings(filtered);
  };

  // Hàm mở modal và tải thông tin booking
  const handleEdit = (booking) => {
    setSelectedBooking({ ...booking }); // Sao chép dữ liệu booking vào state để chỉnh sửa
    setShowModal(true); // Hiển thị modal
  };
  
  const handleDelete = async (id) => {
    window.confirm('Are you sure you want to delete this booking?');
    setLoading(true);
    try {
        const response = await deleteBooking(id);
        console.log(response)
        if(response && response.status === 200){
            setFilteredBookings((prev) => 
                prev.filter((booking) => booking.id !== id)
            )
            alert('Booking deleted successfully!');
        }
    } catch (error) {
        console.log(error);
    }
  }

  // Hàm xử lý cập nhật booking
  const handleUpdate = async (updatedBooking) => {
    setLoading(true);

    try {
      const data = {
        numPeople: updatedBooking.numPeople,
        additionalRequest: updatedBooking.additionalRequest,
        status: updatedBooking.status,
        email: updatedBooking.email,
        username: updatedBooking.username,
        phone: updatedBooking.phone
      };
      const response = await updateBooking(selectedBooking.id, data);
      alert('Booking updated successfully!');
      setFilteredBookings((prev) =>
        prev.map((booking) =>
          booking.id === response.id ? response : booking
        )
      );
      setShowModal(false); // Đóng modal
    } catch (error) {
      console.error('Failed to update booking:', error);
      alert('Failed to update booking. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-booking-container">
      <h1 className="admin-booking-title">Admin Booking</h1>

      <div className="back-to-admin">
        <Link to="/admin" className="btn btn-back">
          &larr; Back to Admin Dashboard
        </Link>
      </div>
      {/* Bộ lọc */}
      <div className="filter-container">
        <label>
          Status:
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Comfirmed</option>
            <option value="CANCELLED">Canceled</option>
          </select>
        </label>

        <label>
          Date:
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </label>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Bảng dữ liệu */}
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Num People</th>
            <th>Additional Request</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.username}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{booking.numPeople}</td>
              <td>{booking.additionalRequest}</td>
              <td>{booking.status}</td>
              <td>
                <button className='btn btn-edit' onClick={() => handleEdit(booking)}>Edit</button>
                <button className='btn btn-delete' onClick={() => handleDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị Modal */}
      <ModalUpdateBooking
        show={showModal}
        bookingData={selectedBooking}
        handleUpdate={handleUpdate}
        handleClose={() => setShowModal(false)}
        loading={loading}
      />
    </div>
  );
};

export default AdminBooking;
