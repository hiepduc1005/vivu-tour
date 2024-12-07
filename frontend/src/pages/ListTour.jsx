import React, { useEffect, useState } from 'react'
import SearchTour from '../components/search/SearchTour'
import '../css/ListTour.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHomeAlt, faHomeLgAlt, faSlash } from '@fortawesome/free-solid-svg-icons'
import OrderMultipleSelectComponent from '../components/DropDownOrder'
import Tour from '../components/Tour'
import { getLocations } from '../service/LocationApi'
import { getTours } from '../service/TourApi'
const ListTour = () => {
  const [isLoading,setIsLoading] = useState(true);
  const [locations,setLocations] = useState([])
  const [tours,setTours] = useState([])

  const fetchLocations = async () => {
    const response = await getLocations();
    if(response){
      setLocations(response)
    }
  }

  const fetchTours = async () => {
    const response = await getTours();
    if(response){
      setTours(response)
    }
  }

  useEffect(() => {
    fetchLocations();
    fetchTours();

  },[])

  useEffect(()=>{
    if(locations && tours){
      setIsLoading(false);
    }
  },[locations,tours])

  return (
    isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className='list-tour-container'>
        <div className="tour-list body">
          <SearchTour></SearchTour>
          <ol className="breadcrumb">
            <li className='itemListElement'>
              <FontAwesomeIcon style={{ fontSize: "12px", color: "#555863", marginRight: "8px", cursor: "pointer" }} icon={faHome}></FontAwesomeIcon>
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
                    {locations.map((location,index) => (
                      <span>{location.name}</span>
                    ))}                 
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">Tour HOT Trong Nước</div>
                  <div className="panel-collapse">
                  {locations.map((location,index) => (
                      <span>{location.name}</span>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">Loại Tours</div>
                  <div className="panel-collapse">
                   {locations.map((location,index) => (
                      <span>{location.name}</span>
                    ))}
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">Tours Theo Chủ Đề</div>
                  <div className="panel-collapse">
                    {locations.map((location,index) => (
                      <span>{location.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-list-right">
              <div className="heading">Tour du lịch Trung Quốc từ Nha Trang</div>
              <div className="description">Thưởng ngoạn Bắc Kinh, Thượng Hải, Tây An. Tham quan Cố Cung, Bến Thượng Hải, và Lăng mộ Tần Thủy Hoàng. Khám phá chợ đêm Wangfujing và Khu phố cổ Zhujiajiao!</div>
              <div className="extra">
                <div className="total">Tổng cộng {tours.length} Tour</div>
                <div className="order-by">
                  <OrderMultipleSelectComponent></OrderMultipleSelectComponent>
                </div>
              </div>
              <div className="tour-list">
              {tours.map((tour, index) => (
                <Tour key={index} tour={tour} />
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
  
}

export default ListTour