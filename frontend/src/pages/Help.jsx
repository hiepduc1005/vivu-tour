import React from "react";
import "../css/Help.css";

const Help = () => {
  const destinations = Array(8).fill({
    title: "Bắc Ninh",
    description:
      "Bắc Ninh nổi lên với các giá trị văn hóa, lịch sử phong phú. Đây là điểm đến lý tưởng cho du khách muốn khám phá và trải nghiệm nét đặc sắc của vùng đồng bằng Bắc Bộ.",
    button: "Tư vấn du lịch",
  });

  return (
    <div className="help-container">
      <h1 className="help-title">Tư vấn du lịch</h1>
      <div className="help-grid">
        {destinations.map((item, index) => (
          <div className="help-card" key={index}>
            <h2 className="help-card-title">{item.title}</h2>
            <p className="help-card-description">{item.description}</p>
            <button className="help-card-button">{item.button}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
