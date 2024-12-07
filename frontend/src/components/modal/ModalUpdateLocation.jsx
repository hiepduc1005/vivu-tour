// ModalUpdateLocation.js
import React, { useState, useEffect } from 'react';
import './ModalUpdateLocation.css'
import { uploadSingleImage } from '../../service/TourApi';

const ModalUpdateLocation = ({ location, onClose, onSave }) => {
  const [name, setName] = useState(location?.name || '');
  const [description, setDescription] = useState(location?.description || '');
  const [selectedImage, setSelectedImage] = useState(location?.imagePath || '');  // State to store selected image

  useEffect(() => {
    // Update state when location prop changes
    setName(location?.name || '');
    setDescription(location?.description || '');
    setSelectedImage(location?.imagePath || '');
  }, [location]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);  // Save the selected file
    }
  };

  const handleSave = async () => {
    let updatedLocation = { name, description,imagePath: location?.imagePath  };

    if (selectedImage instanceof File) {
       const newImagePath = await uploadSingleImage(selectedImage);
       updatedLocation = {...updatedLocation,imagePath:newImagePath};
    }

    onSave(updatedLocation,location.id);  // Pass updated location to the parent component
    onClose();  // Close the modal after saving
  };
  
  return (
    <div className="modal-overlay modal-location">
        <div className="modal-content">
            <h3 className="modal-title">Update Location</h3>
            <div className="modal-field">
            <label className="modal-label">Name:</label>
            <input 
                type="text" 
                className="modal-input"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            </div>
            <div className="modal-field">
            <label className="modal-label">Description:</label>
            <textarea 
                className="modal-textarea"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            </div>
            <div className="modal-field">
            <label className="modal-label">Upload New Image:</label>
            <input 
                type="file" 
                className="modal-file-input"
                onChange={handleImageChange} 
            />
            </div>
            {selectedImage && (
            <div className="image-preview">
                <img 
                src={
                    selectedImage instanceof File
                    ? URL.createObjectURL(selectedImage)  // Tạo URL từ file
                    : `http://localhost:8080${selectedImage}`  // Hoặc dùng URL đã có
                } 
                alt="Image Preview" 
                className="preview-image" 
                />
            </div>
            )}
            <div className="modal-actions">
            <button className="cancel-button" onClick={onClose}>Cancel</button>
            <button className="save-button" onClick={handleSave}>Save</button>
            </div>
        </div>
    </div>

  );
};

export default ModalUpdateLocation;
