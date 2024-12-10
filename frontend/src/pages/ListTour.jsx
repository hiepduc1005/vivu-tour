import React, { useEffect, useState } from 'react';
import SearchTour from '../components/search/SearchTour';
import '../css/ListTour.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Importing pagination icons
import OrderMultipleSelectComponent from '../components/DropDownOrder';
import Tour from '../components/Tour';
import { useLocation } from 'react-router-dom';

import { getLocations } from '../service/LocationApi';
import { getTours, searchTours, searchToursByKeywordAndLocation } from '../service/TourApi';
import ReactPaginate from 'react-paginate';

const ListTour = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [totalTours, setTotalTours] = useState(0);  // To store the total number of tours

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('s');
  const locationIdParam = queryParams.get('locationId');

  const fetchLocations = async () => {
    const response = await getLocations();
    if (response) {
      setLocations(response);
    }
  };

  const fetchTours = async (page) => {
    const response = await getTours(page); // Fetch tours based on the current page
    if (response) {
      setTotalPage(response.totalPages);
      setTours(response.content);
      setTotalTours(response.totalElements); // Assuming your API returns the total number of tours
    }
  };

  const findTours = async (page,search,locationId) => {
    try {
      const response = await searchToursByKeywordAndLocation(page,search,locationId);
      if (response) {
        setTotalPage(response.totalPages);
        setTours(response.content);
        setTotalTours(response.totalElements); // Assuming your API returns the total number of tours
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLocations();
    if(searchParam || locationIdParam){
      findTours(currentPage,searchParam,locationIdParam)
    }else  fetchTours(currentPage);

  }, [currentPage,searchParam,locationIdParam]);

  useEffect(() => {
    if (locations && tours) {
      setIsLoading(false);
    }
  }, [locations, tours]);

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className='list-tour-container'>
        <div className="tour-list body">
          <SearchTour locations={locations} />
          <ol className="breadcrumb">
            <li className='itemListElement'>
              <FontAwesomeIcon style={{ fontSize: "12px", color: "#555863", marginRight: "8px", cursor: "pointer" }} icon={faHome} />
              <span>Trang chủ</span>
            </li>
            <li className='itemListElement'>
              <span>/ Singapore</span>
            </li>
          </ol>
          <div className="tour-list-wrap">
            <div className="tour-list-left">
              <div className="panel-group">
                <div className="panel">
                  <div className="panel-heading">Tour HOT Nước Ngoài</div>
                  <div className="panel-collapse">
                    {locations.map((location, index) => (
                      <span key={index}>{location.name}</span>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">Tour HOT Trong Nước</div>
                  <div className="panel-collapse">
                    {locations.map((location, index) => (
                      <span key={index}>{location.name}</span>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">Loại Tours</div>
                  <div className="panel-collapse">
                    {locations.map((location, index) => (
                      <span key={index}>{location.name}</span>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">Tours Theo Chủ Đề</div>
                  <div className="panel-collapse">
                    {locations.map((location, index) => (
                      <span key={index} onClick={() => window.location = window.location.origin + `/dulich?s=${searchParam}&locationId=${location.id}`}>{location.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-list-right">
              <div className="heading">Tour du lịch Trung Quốc từ Nha Trang</div>
              <div className="description">Thưởng ngoạn Bắc Kinh, Thượng Hải, Tây An. Tham quan Cố Cung, Bến Thượng Hải, và Lăng mộ Tần Thủy Hoàng. Khám phá chợ đêm Wangfujing và Khu phố cổ Zhujiajiao!</div>
              <div className="extra">
                <div className="total">Tổng cộng {totalTours} Tour</div>
                <div className="order-by">
                  <OrderMultipleSelectComponent />
                </div>
              </div>
              <div className="tour-list">
                {tours.length === 0 ? (
                  <div className="no-tours-message">Không tìm thấy tour nào trong danh sách.</div>
                ) : (
                  tours.map((tour, index) => (
                    <Tour key={index} tour={tour} />
                  ))
                )}
              </div>

              {/* Pagination component */}
              <ReactPaginate
                breakLabel="..."
                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                onPageChange={handlePageChange}
                pageRangeDisplayed={1}
                pageCount={totalPage}
                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                renderOnZeroPageCount={null}
                containerClassName="pagination" // Class for the container
                pageClassName="page-item" // Class for each page item
                pageLinkClassName="page-link" // Class for each page link
                previousClassName="previous" // Custom class for the previous button
                nextClassName="next" // Custom class for the next button
                activeClassName="selected" // Custom class for the active page
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ListTour;
