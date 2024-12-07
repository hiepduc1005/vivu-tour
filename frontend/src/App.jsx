import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import ListTour from './pages/ListTour';
import TourDetails from './pages/TourDetails';
import Homepage from './pages/Homepage';
import Layout from './components/layout/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminUser from './pages/AdminUser';
import AdminTour from './pages/AdminTour';
import AdminLocation from './pages/AdminLocation';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin"  >
              <Route index element={<AdminUser />} />
              <Route path='tour' element={<AdminTour/>} />
              <Route path='location' element={<AdminLocation/>} />

          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="dulich"  >
              <Route index element={<ListTour />} />
              <Route path=":id" element={<TourDetails />} />
            </Route>
           
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
  )
}

export default App
