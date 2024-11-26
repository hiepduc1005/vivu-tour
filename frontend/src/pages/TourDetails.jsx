import React, { useState } from 'react'
import '../css/TourDetails.css'
import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageTourDetailsCarousel from '../components/CarouselTourDetailsImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircle, faCircleInfo, faIcicles, faIcons, faLocation, faLocationDot, faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons'
const TourDetails = () => {
  
  const breadcrumbs = [
    { label: 'Home', path: '/' },
   
  ];
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
        <h1>Tour Liên Tuyến Miền Bắc 6N5Đ: Hà Nội - Ninh Bình - Hạ Long - Vịnh Lan Hạ - Sapa - Fansipan</h1>
      </div>
      <div className="tour-details">
        <div className="tour-details-left">
          <div className="carousel">
            <div className="img-container">
              <img src="http://localhost:5173/src/assets/image/ivivu-kdl-trang-an-750x460.gif" alt="" />
            </div>
          </div>
          <div className="tour-location-details">
            <div className="top">
              <div className="start-location">
                <FontAwesomeIcon icon={faLocationDot} style={{marginRight:"8px"}}></FontAwesomeIcon>
                <span>Khởi hành từ: <b>Hà Nội</b></span>
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
            <div className="content">Khám phá vịnh Hạ Long trong hành trình 2 ngày 1 đêm trên du thuyền 6 sao Essence Grand, nơi bạn sẽ được tận hưởng dịch vụ đẳng cấp và chiêm ngưỡng cảnh quan thiên nhiên tuyệt đẹp. Trải nghiệm vẻ đẹp kỳ vĩ của những hòn đảo đá vôi, làn nước trong xanh, và các hang động bí ẩn. Trên du thuyền, bạn có thể tham gia chèo kayak, bơi lội, và thư giãn trên boong tàu ngắm hoàng hôn tuyệt đẹp. Thưởng thức ẩm thực tinh tế và tận hưởng không gian sang trọng, đây là chuyến đi lý tưởng để thư giãn và khám phá di sản thiên nhiên thế giới. Cùng iVIVU khám phá ngay hôm nay!</div>
          </div>

          <div className="tour-accordion">
            <div className="top">
              <h2>Chương trình Tour</h2>
              <div className="see-all">Xem tất cả</div>
            </div>
            <div className="accordion-list">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Ngày 1
                </AccordionSummary>
                <AccordionDetails>
                Xe đón Quý Khách tại sân bay Nội Bài di chuyển về Khách sạn nhận phòng (Công ty sẽ bố trí xe đón theo lịch bay của Khách).
                Tự do khám phá thủ đô Hà Nội với 36 Phố Phường, tham quan Hồ Hoàn Kiếm, cầu Thê Húc, chùa Trấn Quốc, Lăng Bác, Văn Miếu Quốc Tử Giám,… ( Quý Khách có thể thuê xe xích lô, xe điện hoặc thuê xe máy tự do khám phá thủ đô Hà Nội.) 
                Lăng Chủ tịch Hồ Chí Minh.
                Quý Khách tự do ăn tối. Thưởng thức ẩm thực phố cổ mang nét văn hóa của Hà Nội xưa như chả cá Lã Vọng, bún Thang, phở Lý Quốc Sư, phở cuốn Ngũ Xã,…
                Tối: Ngủ đêm tại Khách sạn 3 sao phố cổ Hà Nội.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  Ngày 2
                </AccordionSummary>
                <AccordionDetails>
                Sáng: Quý khách dùng bữa sáng tại khách sạn. Xe và hướng dẫn viên đón Quý khách tại khách sạn, khởi hành đi Ninh Bình, cách Hà Nội 110km.

                Tham quan Chùa Bái Đính với các công trình lớn như Điện thờ Tam Thế, Pháp Chủ, tượng Phật lớn nhất Đông Nam Á và hai quả chuông nặng 36 và 27 tấn.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  Ngày 2
                </AccordionSummary>
                <AccordionDetails>
                Sáng: Quý khách dùng bữa sáng tại khách sạn. Xe và hướng dẫn viên đón Quý khách tại khách sạn, khởi hành đi Ninh Bình, cách Hà Nội 110km.

                Tham quan Chùa Bái Đính với các công trình lớn như Điện thờ Tam Thế, Pháp Chủ, tượng Phật lớn nhất Đông Nam Á và hai quả chuông nặng 36 và 27 tấn.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  Ngày 2
                </AccordionSummary>
                <AccordionDetails>
                Sáng: Quý khách dùng bữa sáng tại khách sạn. Xe và hướng dẫn viên đón Quý khách tại khách sạn, khởi hành đi Ninh Bình, cách Hà Nội 110km.

                Tham quan Chùa Bái Đính với các công trình lớn như Điện thờ Tam Thế, Pháp Chủ, tượng Phật lớn nhất Đông Nam Á và hai quả chuông nặng 36 và 27 tấn.
                </AccordionDetails>
              </Accordion>
          
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
              <div className="item">01/11</div>
              <div className="item">02/11</div>
              <div className="item">03/11</div>
              <div className="item">04/11</div>
            </div>
            <div className="price-person">
              <div className="row1">
                <div className="target">Người lớn</div>
                <div className="age">&gt; 9</div>
              </div>
              <div className="row2">
                <b>x 3.400.000</b>
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
              <div className="price-number">27.200.000<span className='currency'>VND</span></div>
            </div>
            <div className="button-book-tour">
               <button className="button-contact">Liên hệ tư vấn</button>
               <button className="button-book">Đặt tour ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourDetails