import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <>
          <footer class="footer">
          <div class="footer-section">
              <h3>About Us</h3>
              <p>We are a leading company in providing high-quality products and services. Our mission is to improve lives through innovation and excellence.</p>
          </div>
          <div class="footer-section">
              <h3>Quick Links</h3>
              <div className="list-link">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
              </div>
          </div>
          <div class="footer-section">
              <h3>Contact Us</h3>
              <p>Email: contact@example.com</p>
              <p>Phone: +123 456 789</p>
              <div class="social-icons">
                  <a href="#">🔵</a>
                  <a href="#">🔴</a>
                  <a href="#">🟢</a>
              </div>
          </div>
      </footer>
      <div class="footer-bottom">
          &copy; 2024 YourCompany. All rights reserved.
      </div>
    </>
  )
}

export default Footer