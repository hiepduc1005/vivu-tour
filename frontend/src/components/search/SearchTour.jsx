import React, { useEffect, useState } from 'react';
import './SearchTour.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const SearchTour = ({locations}) => {
  const [search, setSearch] = useState(""); // Từ khóa tìm kiếm
  const [location, setLocation] = useState(""); // Địa điểm
  const [locationId, setLocationId] = useState(""); // Địa điểm

  console.log(locations)
  const [filteredLocations, setFilteredLocations] = useState([]); // Địa điểm sau khi lọc
  const [showDropdown, setShowDropdown] = useState(false); // Hiển thị dropdown
  const loca = useLocation();
  // Danh sách địa điểm mẫu
  const sampleLocations = [
    "Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Nha Trang",
    "Phú Quốc",
    "Hội An",
  ];

  useEffect(() => {
    const params = new URLSearchParams(loca.search);
    if (params.get('s')) {
      setSearch(params.get('s'));
    }
    // Cập nhật danh sách địa điểm
  }, []);

  const handleSearch = () => {
    if (search || location) {
      // Điều hướng hoặc xử lý tìm kiếm
      window.location = window.location.origin + "/dulich?s=" + search + "&locationId=" + locationId;
    }
  };

  // Xử lý sự kiện khi người dùng nhập vào ô "Khởi hành từ"
  const handleLocationInput = (e) => {
    const value = e.target.value;
    setLocation(value);

    // Lọc danh sách địa điểm theo từ khóa
    const filtered = locations.filter((loc) =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);

    // Hiển thị danh sách dropdown
    setShowDropdown(true);
  };

  // Xử lý khi người dùng chọn địa điểm từ dropdown
  const handleSelectLocation = (loc) => {
    setLocation(loc.name);
    setLocationId(loc.id)
    setShowDropdown(false); // Ẩn dropdown sau khi chọn
  };

  return (
    <div className='search'>
      <div className="top">
        <FontAwesomeIcon icon={faLocationDot} style={{ color: "#494b55", marginRight: "12px" }} />
        <input
          type="text"
          maxLength="200"
          placeholder="Bạn muốn đi đâu?"
          autoComplete="off"
          spellCheck="false"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Cập nhật giá trị search
        />
      </div>

      <div className="bottom">
        <div className="date-input">
          <label htmlFor="departure-date">Ngày khởi hành:</label>
          <input type="date" id="departure-date" />
        </div>
        <div className="location-input">
          <label htmlFor="departure">Khởi hành từ</label>
          <input
            type="text"
            id="departure"
            placeholder="Hồ Chí Minh"
            value={location} // Hiển thị giá trị location vào input
            onChange={(e) => handleLocationInput(e)} // Cập nhật giá trị location
            onFocus={() => setShowDropdown(true)} // Hiển thị dropdown khi nhấp vào input
          />
          {/* Hiển thị danh sách địa điểm lọc được */}
          {showDropdown && (
            <ul className="dropdown">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectLocation(loc)} // Chọn địa điểm
                    className="dropdown-item"
                  >
                    {loc.name}
                  </li>
                ))
              ) : (
                <li className="dropdown-item">Không tìm thấy địa điểm</li>
              )}
            </ul>
          )}
        </div>
        <button className="search-button" onClick={() => handleSearch()}>Tìm</button>
      </div>
    </div>
  );
};

export default SearchTour;
