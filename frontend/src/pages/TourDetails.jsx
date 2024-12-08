import React, { useEffect, useState } from 'react'
import '../css/TourDetails.css'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Breadcrumbs, Card, CardContent, CardHeader, Rating, TextField, Typography } from '@mui/material'
import { Link, useLocation, useParams } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleInfo, faLocationDot, faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { getTourById } from '../service/TourApi';
import Button from "@mui/material/Button";

import ModalBooking from '../components/modal/ModalBooking';
import { createReview } from '../service/ReviewApi';
import dayjs from 'dayjs';
const TourDetails = () => {

  const { id } = useParams();
  const [tour,setTour] = useState()
  const [listDate,setListDate] = useState([])
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [quantity, setQuantity]  = useState(1);
  const [totalPrice,setTotalPrice] = useState();
  const [dateSelected,setDateSelected] = useState();
  const [dateSelectedIndex,setDateSelectedIndex] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token")

  const [newReview, setNewReview] = useState({
    tourId: id,
    userId: user ? user.id : null,
    comment: '',
    rating: 5,
  });


  const breadcrumbs = [
    { label: 'Home', path: '/' },
   
  ];

  const handleReviewSubmit = async () => {
    if (newReview.comment.trim() === '' || newReview.rating < 0.5 || newReview.rating > 5) {
      alert('Vui lòng nhập đánh giá hợp lệ.');
      return;
    }

  
    if(!user || !token){
      window.location = window.location.origin + "/signin";
    }

    try {
      const reviewCreated = await createReview(newReview,token);
  
      if (reviewCreated) {
        setNewReview({ tourId: id,userId: user ? user.id : null, comment: '', rating: 5 });
        setTour(prevTour => ({
          ...prevTour,
          reviews: [...prevTour.reviews, reviewCreated], // Thêm đánh giá mới vào danh sách đánh giá
        }));
      } else {
        alert('Không thể gửi đánh giá, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Lỗi gửi đánh giá:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  const handleAdd = () => {
    if(quantity <= 30){
      setQuantity(pre => pre + 1);
    }
  }

  const handleDelete = () => {
    if(quantity > 1){
      setQuantity(pre => pre - 1)
    }
  }

  const handleDateClick = (date,index) => {
    // Tách ngày và tháng từ chuỗi "dd/mm"
    const [day, month] = date.split('/');
    
    // Lấy năm hiện tại
    const year = new Date().getFullYear();
    
    // Tạo một đối tượng Date với ngày, tháng và năm hiện tại
    const selectedDate = new Date(year, month - 1, day); // month - 1 vì tháng trong JavaScript bắt đầu từ 0
    
    // Chuyển đổi ngày thành định dạng ISO 8601 (YYYY-MM-DD)
    const isoDate = selectedDate.toISOString(); // Lấy phần YYYY-MM-DD
    setDateSelected(isoDate); 
    setDateSelectedIndex(index);
  }
  

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
    if (tour) {
      setTotalPrice(quantity * tour.pricePerPerson);
    }
  }, [quantity, tour]);

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
              {listDate && listDate?.map((date, index) => (
                <div
                  key={`date${index}`}
                  onClick={() => handleDateClick(date,index)}
                  className={`item ${dateSelectedIndex === index ? 'selected' : ''}`}
                >
                  {date}
                </div>
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
                <FontAwesomeIcon onClick={() => handleAdd()} icon={faPlus} style={{fontSize:"12px",cursor:"pointer"}}></FontAwesomeIcon>
                <div className="quantity">{quantity}</div>
                <FontAwesomeIcon onClick={() => handleDelete()} icon={faSubtract} style={{fontSize:"12px",cursor:"pointer"}}></FontAwesomeIcon>
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
              <div className="price-number">{totalPrice}<span className='currency'>VND</span></div>
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
        <Box className="tour-review-section" sx={{ p: 3 }}>
      {/* Phần tiêu đề */}
      <Box className="heading" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h3">
          Đánh giá về Tour ({tour.reviews.length})
        </Typography>
      </Box>

      {/* Danh sách đánh giá */}
      <Box className="reviews" sx={{ mb: 3 }}>
        {tour.reviews && tour.reviews.length > 0 ? (
          tour.reviews.map((review, index) => (
            <Card key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardHeader
                avatar={<Avatar alt={review.userName} />}
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ mr: 1 }}>
                      {review.userName}
                    </Typography>
                    <Rating value={review.rating} readOnly precision={0.5} size="small" />
                  </Box>
                }
                subheader={
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="caption" color="text.secondary">
                     {dayjs(review.createdAt).format("DD/MM/YYYY HH:mm")}
                    </Typography> 
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="body2">{review.comment}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">Chưa có đánh giá nào.</Typography>
        )}
      </Box>

      {/* Thêm đánh giá mới */}
      <Box className="add-review" sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Viết đánh giá của bạn
        </Typography>

        {/* Phần nội dung đánh giá */}
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Nội dung đánh giá"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          sx={{ mb: 3 }}
        />

        {/* Phần đánh giá sao */}
        <Box className="rating-section" sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>Đánh giá:</Typography>
          <Rating
            value={newReview.rating}
            onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
            precision={0.5}
          />
        </Box>

        {/* Nút gửi đánh giá */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReviewSubmit(newReview)}
          disabled={!newReview.comment || !newReview.rating}
        >
          Gửi Đánh Giá
        </Button>
      </Box>
    </Box>
      </div>
      {showModal && (
        <ModalBooking
          dateSelected={dateSelected}
          quantity={quantity}
          tour = {tour}
          user={user} // Truyền thông tin người dùng đã đăng nhập
          onClose={() => setShowModal(false)} // Hàm đóng modal
        />
      )}
    </div>
  )
}

export default TourDetails