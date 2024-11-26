import React from 'react'
import './SearchTour.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
const SearchTour = () => {
  return (
    <div className='search'>
        <div className="top">
          <FontAwesomeIcon icon={faLocationDot} style={{color: "#494b55",marginRight:"12px"}}></FontAwesomeIcon>
            <input 
                type="text" 
                maxLengthg="200" 
                placeholder="Bạn muốn đi đâu?" 
                autoComplete="off" 
                spellCheck="false"
                
             />
        </div>
        <div className="bottom">
          <div className="date-input">
            <label for="departure-date">Ngày khởi hành:</label>
            <input type="date" id="departure-date" />
          </div>
          <div class="location-input">
              <label for="departure">Khởi hành từ</label>
              <input type="text" id="departure" placeholder="Hồ Chí Minh"/>
          </div>
          <button class="search-button">Tìm</button>
        </div>
    </div>
  )
}

export default SearchTour