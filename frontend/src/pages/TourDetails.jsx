import React, { useEffect, useState } from 'react'
import '../css/TourDetails.css'
import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleInfo, faLocationDot, faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { getTourById } from '../service/TourApi';
import ModalBooking from '../components/modal/ModalBooking';
const TourDetails = () => {
  
  const { id } = useParams();

  const [tour,setTour] = useState()
  const [listDate,setListDate] = useState([])
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal

  const user = JSON.parse(localStorage.getItem("user"));

  const breadcrumbs = [
    { label: 'Home', path: '/' },
   
  ];

  function generateNextDays(numberOfDays) {
    const today = new Date();
    const result = [];
  
    for (let i = 1; i <= numberOfDays; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const formattedDate = `${nextDay.getDate()}/${nextDay.getMonth() + 1}`; // Định dạng ngày/tháng
      result.push(formattedDate);
    }
  
    return result;
  }

  const fetchTourById = async (tourId) => {
    try{
      const tourData = await getTourById(tourId);
      if(tourData && tourData.status === 200){
        setTour(tourData.data)
      }else window.location = window.location.origin + "/error";
    }catch{
      window.location = window.location.origin + "/error";
    }
  }

  useEffect(() => {
    fetchTourById(id);
    setListDate(generateNextDays(4));

    
  },[])

  if(!tour){
    return <div>Loading...</div>
  }


  return ( 
    <div className='tour-details-container body'>
      <div className="breadcrumb">
        <Breadcrumbs  aria-label="breadcrumbs" size="sm">
          {breadcrumbs.map((item) => (
            <Link 
              key={item.label} 
              to={item.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {item.label}
            </Link>
          ))}
          <Typography color="text.primary">Singapore</Typography>
        </Breadcrumbs>
      </div>
      <div className="tourname">
        <h1>{tour.name}</h1>
      </div>
      <div className="tour-details">
        <div className="tour-details-left">
          <div className="carousel">
            <div className="img-container">
              <img src={`http://localhost:8080${tour.images[0]}`} alt="image" />
            </div>
          </div>
          <div className="tour-location-details">
            <div className="top">
              <div className="start-location">
                <FontAwesomeIcon icon={faLocationDot} style={{marginRight:"8px"}}></FontAwesomeIcon>
                <span>Khởi hành từ: <b>{tour.startLocation.name}</b></span>
              </div>
              <div className="tour-code">
                <span>Mã Tuor: <b>TO3016</b></span>
              </div>
            </div>
            <div className="bottom">
              <span>Tour không gồm Vé Máy Bay bao gồm</span>
              <div className="list-include">
                <div><FontAwesomeIcon icon={faCheck} style={{color:"#26bed6"}}></FontAwesomeIcon> Du thuyền 5*</div>
                <div><FontAwesomeIcon icon={faCheck} style={{color:"#26bed6"}}></FontAwesomeIcon> Bữa ăn</div>
                <div><FontAwesomeIcon icon={faCheck} style={{color:"#26bed6"}}></FontAwesomeIcon> Xe tham quan</div>
                <div><FontAwesomeIcon icon={faCheck} style={{color:"#26bed6"}}></FontAwesomeIcon> Vé tham quan</div>
                <div><FontAwesomeIcon icon={faCheck} style={{color:"#26bed6"}}></FontAwesomeIcon> Hướng dẫn viên</div>
                <div><FontAwesomeIcon icon={faCheck} style={{color:"#26bed6"}}></FontAwesomeIcon> Bảo hiểm du lịch</div>
              </div>
            </div>
          </div>

          <div className="tour-experience">
            <div className="title"><b>Những trải nghiệm thú vị trong tour</b></div>
            <div className="content">{tour.description}</div>
          </div>

          <div className="tour-accordion">
            <div className="top">
              <h2>Chương trình Tour</h2>
              <div className="see-all">Xem tất cả</div>
            </div>
            <div className="accordion-list">
              {tour?.schedules?.map((schedule,index) => {
                return (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                    Ngày {schedule.day}
                    </AccordionSummary>
                    <AccordionDetails>
                    {schedule.activity}
                    </AccordionDetails>
                  </Accordion>
                )
              })}
          
            </div>
          </div>
        </div>
        <div className="tour-details-right">
          <div className="heading">
            <h3>Lịch Trình và Giá Tour</h3>
          </div>
          <div className="main">
            <div className="title">Chọn Lịch Trình và Xem Giá:</div>
            <div className="list-tour-date">
              {listDate && listDate?.map((date,index) => (
                  <div key={`date${index}`} className="item">{date}</div>
              ))}
            
            </div>
            <div className="price-person">
              <div className="row1">
                <div className="target">Người lớn</div>
                <div className="age">&gt; 9 tuổi</div>
              </div>
              <div className="row2">
                <b>x {tour.pricePerPerson}</b>
              </div>
              <div className="row3">
                <FontAwesomeIcon icon={faPlus} style={{fontSize:"12px",cursor:"pointer"}}></FontAwesomeIcon>
                <div className="quantity">1</div>
                <FontAwesomeIcon icon={faSubtract} style={{fontSize:"12px",cursor:"pointer"}}></FontAwesomeIcon>
              </div>
            </div>
            <div className="warning">
              <FontAwesomeIcon icon={faCircleInfo} style={{marginRight:"6px"}}></FontAwesomeIcon>
              <span>Liên hệ để xác nhận chỗ</span>
            </div>
          </div>
          <div className="bottom">
            <div className="total-price">
              <div className="content">Tổng Giá Tour</div>
              <div className="price-number">{tour.pricePerPerson}<span className='currency'>VND</span></div>
            </div>
            <div className="button-book-tour">
               {/* <button className="button-contact"></button> */}
               <button 
                  className="button-book" 
                  style={{justifyContent: "flex-end"}}
                  onClick={() => setShowModal(true)}> Yêu cầu đặt</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalBooking
          user={user} // Truyền thông tin người dùng đã đăng nhập
          onClose={() => setShowModal(false)} // Hàm đóng modal
        />
      )}
    </div>
  )
}

export default TourDetails