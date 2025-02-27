const apiUrl = process.env.REACT_APP_API_URL;

const fetchApi = (endpoint, options = {}) => {
  return fetch(`${apiUrl}${endpoint}`, options)
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export default fetchApi;
