import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageTourDetailsCarousel = () => {
  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <Carousel
        dynamicHeight={true}
        showArrows={true}
        showThumbs={true}           // Hiển thị thumbnail
        showStatus={false}          // Ẩn trạng thái (ví dụ 1/5)
        infiniteLoop={true}         // Vòng lặp vô tận
        autoPlay={true}             // Tự động chuyển ảnh
        interval={3000}             // Thời gian chuyển ảnh (ms)
        stopOnHover={true}          // Dừng lại khi hover chuột
        swipeable={true}            // Cho phép swipe trên thiết bị di động
        emulateTouch={true} 
        showIndicators ={false}        // Cho phép người dùng "kéo" trên desktop
      >
        <div>
          <img src="abstract03.jpg" style={{objectFit:"contain"}} alt="Image 1" />
        </div>
        <div>
          <img src="abstract02.jpg" style={{objectFit:"contain"}} alt="Image 2" />
        </div>
        <div>
          <img src="abstract03.jpg" style={{objectFit:"contain"}} alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageTourDetailsCarousel;
