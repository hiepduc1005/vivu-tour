import axios  from "../ultils/axiosCustomize";

const apiBaseUrl = "api/v1/locations";

export const createLocation = async (locationData) => {
    const formData = new FormData();
  
    // Gắn thông tin location
    formData.append(
      'locationCreate',
      new Blob(
        [
          JSON.stringify({
            name: locationData.name,
            description: locationData.description,
          }),
        ],
        { type: 'application/json' }
      )
    );
  
    // Gắn file ảnh
    formData.append('file', locationData.file);
  
    try {
      const response = await axios.post(apiBaseUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  };

  
  export const getLocations = async (token) => {
    try {
      const response = await axios.get(apiBaseUrl, {
        headers: {
          Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
        },
      });
      return response.data; // Returning the data from the API response
    } catch (err) {
      console.error('Error fetching locations:', err);
      throw err; // Rethrow error for further handling
    }
  };

  
  
  export const deleteLocation = async (id,token) => {
    try {
      const response = await axios.delete(`${apiBaseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
        },
      });
      return response.data; // Returning the data from the API response
    } catch (err) {
      console.error('Error fetching locations:', err);
      throw err; // Rethrow error for further handling
    }
  };