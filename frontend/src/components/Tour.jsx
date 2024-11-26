import React from 'react'
import tour from '../assets/image/tour.jpg'
import "./Tour.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
const Tour = ({tour}) => {
  return (
    <div className='tour-container'>
        <div className="img">
            <img src={`http://localhost:8080/${tour.image_path}`} alt="TOUR" />
        </div>
        <div className="tour-wrap">
            <div className="tour-name">Tour Thái Lan 5N4Đ: Bangkok - Pattaya - Công Viên Khủng Long (Bay Sáng, Trưa)</div>
            <div className="tour-ratting">
                <div className="score">8.4</div>
                <div className="score-description">Rất tốt</div>
                <span> | 15 đánh giá </span>
            </div>
            <div className="tour-bottom">
                <div className="tour-bottom-left">
                    <FontAwesomeIcon icon={faClock} style={{backgroundColor:"#fff",marginRight:"8px"}}></FontAwesomeIcon>
                    <span>6 Ngày 5 Đêm</span>
                </div>
                <div className="tour-bottom-right">
                    <div className="origin-price">6.100.000 VND</div>
                    <div className="discount-price">5.999.000<span className='currency'>VND</span></div>
                </div>
            </div>
        </div>
        <div className="ribbon">
            <h1>Số lượng có hạn</h1>
        </div>
    </div>
  )
}

export default Tour