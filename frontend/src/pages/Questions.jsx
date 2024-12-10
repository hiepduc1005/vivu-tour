import React from "react";
import "../css/Questions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Questions = () => {
  return (
    <div className="questions-container">
      <h1 className="questions-title">Hỏi đáp</h1>
      <div className="questions-content">
        <h2>Giá Phòng</h2>
        <ul>
          <li>Câu hỏi thường gặp 1</li>
          <li>Câu hỏi thường gặp 2</li>
          <li>Câu hỏi thường gặp 3</li>
          <li>Câu hỏi thường gặp 4</li>
          <li>Câu hỏi thường gặp 5</li>
        </ul>
        <h2>Đặt Phòng</h2>
        <ul>
          <li>Câu hỏi thường gặp 1</li>
          <li>Câu hỏi thường gặp 2</li>
          <li>Câu hỏi thường gặp 3</li>
          <li>Câu hỏi thường gặp 4</li>
          <li>Câu hỏi thường gặp 5</li>
        </ul>
        <h2>Thay Đổi Thông Tin Đặt Phòng</h2>
        <ul>
          <li>Câu hỏi thường gặp 1</li>
          <li>Câu hỏi thường gặp 2</li>
          <li>Câu hỏi thường gặp 3</li>
          <li>Câu hỏi thường gặp 4</li>
          <li>Câu hỏi thường gặp 5</li>
        </ul>
        <h2>Thanh toán</h2>
        <ul>
          <li>Câu hỏi thường gặp 1</li>
          <li>Câu hỏi thường gặp 2</li>
          <li>Câu hỏi thường gặp 3</li>
          <li>Câu hỏi thường gặp 4</li>
          <li>Câu hỏi thường gặp 5</li>
        </ul>
        <div className="questions-input-container">
          <input
            type="text"
            placeholder="Bạn cần hỗ trợ?"
            className="questions-input"
          />
          <button className="questions-button">
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
