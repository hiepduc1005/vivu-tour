import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Admin.css';
import { 
    getBookedBookingsToday, 
    getBookings, 
    getBookingsToday 
} from '../service/BookingApi';
import { 
    getUserRoleByToken,
    getUsers, 
    getUserToday 
} from '../service/UserApi';
import { 
    getLocations, 
    getLocationsToday 
} from '../service/LocationApi';
import { getTours } from '../service/TourApi';

const Admin = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [allTours, setAllTours] = useState([]);

    const [todayStats, setTodayStats] = useState({
        bookings: 0,
        users: 0,
        locations: 0,
        bookedTours: 0
    });


    const getUserRole = async (token) => {
        try {
            const roles = await getUserRoleByToken(token)
            if(!roles.includes("ADMIN")){
                window.location = window.location.origin + "/signin";
            }
        } catch (error) {
            window.location = window.location.origin + "/signin";
        }
    }

    const fetchTotalData = async (token) => {
        try {
            const [bookings, users, locations, tours] = await Promise.all([
                getBookings(token),
                getUsers(token),
                getLocations(token),
                getTours()
            ]);

            setAllBookings(bookings || []);
            setAllUsers(users || []);
            setAllLocations(locations || []);
            setAllTours(tours || []);
        } catch (error) {
            console.error('Error fetching total data:', error);
            // Redirect to signin page if token is invalid
            window.location.href = "/signin";
        }
    };

    const fetchTodayData = async (token) => {
        try {
            const [bookingsToday, usersToday, locationsToday, bookedToursToday] = await Promise.all([
                getBookingsToday(token),
                getUserToday(token),
                getLocationsToday(token),
                getBookedBookingsToday(token)
            ]);

            setTodayStats({
                bookings: bookingsToday || 0,
                users: usersToday || 0,
                locations: locationsToday || 0,
                bookedTours: bookedToursToday || 0
            });
        } catch (error) {
            console.error('Error fetching today\'s data:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // Example: get token
        if (!token) {
            window.location = window.location.origin + "/signin";
            return; // Kết thúc nếu không có token
        } else {
            getUserRole(token)
            fetchTotalData(token);
            fetchTodayData(token);
        }

       

    }, []);


    return (
        <div className='admin'>
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin</h2>
                </div>
                <ul className="sidebar-nav">
                    <li><Link to="/admin">Dashboard</Link></li>
                    <li><Link to="/admin/tour">Tour</Link></li>
                    <li><Link to="/admin/booking">Booking</Link></li>
                    <li><Link to="/admin/location">Location</Link></li>
                    <li><Link to="/admin/user">User</Link></li>
                    <li><Link to="/admin/reports">Reports</Link></li>
                </ul>
            </div>

            <div className="content">
                <h1>Dashboard</h1>

                {/* Tổng quan */}
                <div className="dashboard-stats">
                    <div className="stat-item">
                        <h3>Total Users</h3>
                        <p>{allUsers.length}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Total Bookings</h3>
                        <p>{allBookings.length}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Total Locations</h3>
                        <p>{allLocations.length}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Total Tours</h3>
                        <p>{allTours.totalElements}</p>
                    </div>
                </div>

                {/* Hoạt động hôm nay */}
                <div className="dashboard-details">
                    <h2>Today Activities</h2>
                    <div className="dashboard-stats">
                        <div className="stat-item">
                            <h3>Total Bookings Today</h3>
                            <p>{todayStats.bookings.length}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Total New Users Today</h3>
                            <p>{todayStats.users.length}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Total Locations Added Today</h3>
                            <p>{todayStats.locations.length}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Total Tours Booked Today</h3>
                            <p>{todayStats.bookedTours.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
