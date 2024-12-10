import React from "react";

const About = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1 style={{ textAlign: "left", color: "#1a2c4b",fontSize: "30px",fontWeight: "bold" , margin: "30px 0" }}>Giới thiệu</h1>
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          
        }}
      >
        <h2  style={{
          textAlign: "left",
          fontWeight: "bold"
        }}>Giới thiệu về GoTour.com</h2>
        <p style={{marginTop:"26px"}}>
          Thành lập năm 2010, GoTour.com là thành viên của Tập đoàn Thế Giới Tour với hơn 20 năm kinh nghiệm trong lĩnh vực lữ hành.
          GoTour.com chuyên cung cấp những trải nghiệm tuyệt vời cho các hành trình cả nội địa và quốc tế. Với đội ngũ hướng dẫn viên
          chuyên nghiệp và tận tâm, chúng tôi cam kết mang lại sự hài lòng cao nhất cho khách hàng.
        </p>
        <p  style={{marginTop:"26px"}}>
          Hiện nay, GoTour.com đã phục vụ hơn 1 triệu khách hàng, tổ chức hơn 2.500 chuyến tour với hơn 3.000 khách hàng hài lòng mỗi năm.
        </p>
        <h3 style={{marginTop:"26px"}}>Mục tiêu</h3>
        <p style={{marginTop:"6px"}}>
          Với mục tiêu mang đến cho khách hàng trải nghiệm "Tốt nhất và an toàn nhất", GoTour.com không ngừng cải tiến để đáp ứng sự
          kỳ vọng ngày càng cao của khách hàng.
        </p>
        <h3 style={{marginTop:"26px"}}>Liên hệ</h3>
        <p>
          Để biết thêm thông tin chi tiết, vui lòng liên hệ:
          <ul>
            <li>Hotline: 0900 000 000</li>
            <li>Email: gotour@gmail.com</li>
            <li>Địa chỉ: 49A Đào Duy Từ, Hà Nội</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default About;
