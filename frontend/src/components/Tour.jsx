import React, { useState } from 'react'
import tour from '../assets/image/tour.jpg'
import "./Tour.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
const Tour = ({tour}) => {

    const [totalDayAndNight,setTotalDayAndNight] = useState(calculateDaysAndNights(tour.startDate,tour.endDate));

    function calculateDaysAndNights(startDate, endDate) {
        // Đảm bảo cả startDate và endDate là Date object
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        // Tính số ngày
        const timeDifference = end - start;
        const totalDays = Math.round(timeDifference / (1000 * 60 * 60 * 24)) + 1; // Thêm 1 để tính cả ngày đầu tiên
      
        // Số đêm
        const totalNights = totalDays > 0 ? totalDays - 1 : 1;
      
        return {
          days: totalDays,
          nights: totalNights
        };
    }
  return (
    <div className='tour-container'>
        <div className="img">
            <img src={`http://localhost:8080${tour.images[0]}`} alt="TOUR" />
        </div>
        <div className="tour-wrap">
            <div className="tour-name">Tour Thái Lan 5N4Đ: Bangkok - Pattaya - Công Viên Khủng Long (Bay Sáng, Trưa)</div>
            <div className="tour-ratting">
                <div className="score">{tour.averageRatting} </div>
                <div className="score-description">{tour.ratingDescription}</div>
                <span> | {tour.reviews.length} đánh giá </span>
            </div>
            <div className="tour-bottom">
                <div className="tour-bottom-left">
                    <FontAwesomeIcon icon={faClock} style={{backgroundColor:"#fff",marginRight:"8px"}}></FontAwesomeIcon>
                    { 
                        totalDayAndNight.days > 1  
                        ? <span>{totalDayAndNight.days} Ngày {totalDayAndNight.nights} Đêm</span>
                        : <span>Trong ngày</span>
                    }
                </div>
                <div className="tour-bottom-right">
                    <div className="origin-price">{tour.pricePerPerson} VND</div>
                    <div className="discount-price">{tour.pricePerPerson}<span className='currency'>VND</span></div>
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