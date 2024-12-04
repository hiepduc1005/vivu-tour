import React from 'react'
import './Header.css'
import logo from "../../assets/icon/logo.svg"
import { useNavigate } from 'react-router-dom'; // Nếu bạn sử dụng react-router để điều hướng

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
const Header = () => {
  const naviage = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    naviage("/")
  }
  return (
    <header className="header">
           <div className="header-left">
            <div className="logo">
                <img src={logo}></img>
            </div>
            <ul className="nav-link">
                <li>Tours</li>
                <li>Giới thiệu</li>
                <li>Hỏi đáp</li>
                <li>Hỗ trợ</li>
            </ul>
           </div>
           <div className="header-right">
            <div className="header-account">
                <div className="profile-image">
                <FontAwesomeIcon 
                    icon={faUser} 
                    style={{ fontSize: '24px', padding: '20px' }} 
                    />               
                </div>
                {
                user ?  <span className='username'>{user.name}</span>
                :
                <span className='username' onClick={()=> naviage("/signin")} >Đăng nhập</span>
              }
            </div>
            <div className="hotline">1900 1870</div>
            {user ?  <div className="logout" onClick={handleLogOut} >Đăng xuất</div> : ""}
           
           </div>
    </header>
  )
}

export default Header