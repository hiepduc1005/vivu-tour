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
import AdminBooking from './pages/AdminBooking';
import Admin from './pages/Admin';
import About from './pages/About';
import Questions from './pages/Questions';
import Help from './pages/Help';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin"  >
              <Route index element={<Admin />} />
              <Route path='tour' element={<AdminTour/>} />
              <Route path='location' element={<AdminLocation/>}/>
              <Route path='booking' element={<AdminBooking/>} />
              <Route path='user' element={<AdminUser/>} />

          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="dulich"  >
              <Route index element={<ListTour />} />
              <Route path=":id" element={<TourDetails />} />
            </Route>
            <Route path='about' element={<About></About>}></Route>
            <Route path='common-question' element={<Questions></Questions>}></Route>
            <Route path='help' element={<Help></Help>}></Route>

           
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
  )
}

export default App
