import React, { useEffect, useState } from 'react'
import SearchTour from '../components/search/SearchTour'
import Tour from '../components/Tour'
import '../css/Homepage.css'
import popularLocation from '../assets/image/popular-location.jpg'
import otherPopularLocation from '../assets/image/other-popular-location.jpg'
import { useNavigate } from 'react-router-dom'
import { createTour, getTours } from '../service/TourApi'


const Homepage = () => {
    const [tours, setTours] = useState([]); // Khởi tạo state để lưu danh sách tour
    const user = localStorage.getItem('user');
    const naviage = useNavigate();

    const fetchListTour = async () => {
        try {
            const response = getTours(); // Thay 'API_URL_HERE' bằng URL API thật
            if (!response.ok) throw new Error('Failed to fetch tours'); // Kiểm tra phản hồi từ server
            const data = await response.json(); // Chuyển đổi dữ liệu trả về sang định dạng JSON
            setTours(data); // Cập nhật state với dữ liệu tour
        } catch (error) {
            console.error('Error fetching tours:', error); // Xử lý lỗi nếu có
        }
    };

    useEffect(() => {
        fetchListTour(); // Gọi hàm fetch khi component được render
    }, []);

  return (
    <div className='homepage-container'>
        <div className="banner-home">
            <div className="banner-wrap">
                <div className="banner-container">
                    <div className="title">
                        <h1>Thế giới tour trong tay bạn</h1>
                        <h2>Phục vụ tận tâm, giá siêu ưu đãi</h2>
                    </div>
                    <div className='search-container'>
                        <SearchTour></SearchTour>
                    </div>
                </div>
            </div>
        </div>


        <div className="tours-recent"></div>
        <div className="tours-discount-container">
            <div className="tours-discount body">
                <div className="title-group">
                    <div className='name'>Tour Ưu Đãi Tốt Nhất Hôm Nay</div>
                    <div className='subname'>Nhanh Tay Đặt Ngay. Để Mai Sẽ Lỡ</div>
                </div>
                <div className="list-tour">
                 {tours?.map((tour, index) => (
                            <Tour tour={tour} /> // Hiển thị từng tour
                        
                        ))} 

                </div>
                <div className="more-tour">
                    <a href='#'>Xem thêm tours</a>
                </div>
            </div>
        </div>
        <div className="popular-location body">
            <div className="title-group">
                <div className='name'>Các điểm du lịch phổ biến</div>
                <div className='subname'>Bao La Thế Giới Bốn Bể Là Nhà</div>
            </div>
            <div className="popular-location-container">
                <div className="firstpopular_item">
                    <div className="popular-item">
                        <div className="img-container">
                            <img src={popularLocation} alt="" />
                        </div>
                        <div class="overlay">
                            <span className="location-name">Trung Quốc</span>
                            <span className="number-tours">168</span>
                        </div>
                    </div>
                </div>
                <div className="after-first-item">
                    
                    <div className="popular-item">
                        <div className="img-container">
                            <img src={otherPopularLocation} alt="" />
                            <div class="overlay">
                                <div className="location-name">Trung Quốc</div>
                                <div className="number-tours">168</div>
                            </div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <div className="img-container">
                            <img src={otherPopularLocation} alt="" />
                            <div class="overlay">
                                <div className="location-name">Trung Quốc</div>
                                <div className="number-tours">168</div>
                            </div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <div className="img-container">
                            <img src={otherPopularLocation} alt="" />
                            <div class="overlay">
                                <div className="location-name">Trung Quốc</div>
                                <div className="number-tours">168</div>
                            </div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <div className="img-container">
                            <img src={otherPopularLocation} alt="" />
                            <div class="overlay">
                                <div className="location-name">Trung Quốc</div>
                                <div className="number-tours">168</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Homepage