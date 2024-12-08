import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <>
        <footer class="footer">
          <div class="footer-section">
              <h3>Về iVIVU.com</h3>
              <p>Chúng tôi</p>
              <p>iVIVU Blog</p>
              <p>PMS - Miễn phí</p>
          </div>
          <div class="footer-section">
              <h3>Thông Tin Cần Biết</h3>
              <div className="list-link">
                <a href="#">Điều kiện & Điều khoản</a>
                <a href="#">Quy chế hoạt động</a>
                <a href="#">Câu hỏi thường gặp</a>
              </div>
          </div>
          <div class="footer-section">
              <h3>Đối tác</h3>
              <p>Quy chế bảo hiểm Cathay</p>
              <p>Yêu cầu bồi thường Cathay</p>
              <p>Quy chế trả góp</p>
          </div>
          <div class="footer-section">
              <h3>Đối tác</h3>
              <p>Quy chế bảo hiểm Cathay</p>
              <p>Yêu cầu bồi thường Cathay</p>
              <p>Quy chế trả góp</p>
          </div>
          <div class="footer-section">
              <h3>Được chứng nhận</h3>
              <div className='img'>
                <img src='../../../../public/bocongthuong.png'></img>
                <img style={{maxWidth:"68px", marginLeft: "16px"}} src='../../../../public/iata_logo.webp'></img>
              </div>
          </div>
      </footer>
      <div class="footer-bottom">
        <hr></hr>
          &copy; 2024 GoTour. All rights reserved.
      </div>
    </>
  )
}

export default Footer