import axios from 'axios';

const API_HOST = "localhost:3000"
axios.defaults.withCredentials = true;

//Register
export const register = async (name, email, id, password) => {
    const body = { 'name': name, 'email': email, 'id': id, 'password': password }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/register`,
        headers: {'Content-Type': 'application/json',},
        data: body,
    })
    console.log(res.data);
    return res.data
}

export const login = async (id, password) => {
    const body = {'id': id, 'password': password }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/login`,
        headers: {'Content-Type': 'application/json',},
        data: body,
        withCredentials: true
    })
    if (res.data && res.data.redirect) {
        // Manually handle the redirect
       // window.location.href = res.data.redirect;
    }
    console.log(res.data);
    return res.data
}

export const getItems = async (numberOfItems, offset, itemType) => {
    try {
      const body = {'numberOfItems': numberOfItems, 'offset': offset, 'itemType': itemType };
      const res = await axios({
        method: 'post',
        url: `http://${API_HOST}/getItems`,
        headers: { 'Content-Type': 'application/json' },
        data: body,
        withCredentials: true
    });
  
      if (res.data) {
        console.log(res.data);
      }
  
      return res.data;
    } catch (error) {
      console.error('Error in getItems:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

export const postItem = async (itemData) => {
    const formData = new FormData();

    // Append form data key-value pairs
    Object.entries(itemData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    // Append the image file
    const imageFile = document.getElementById('imageFileInput').files[0]; // Replace with your actual file input ID
    formData.append('image', imageFile);

    const res = await axios.post(`http://${API_HOST}/postItem`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });

    if (res.data) {
        console.log(res.data);
    }
    return res.data;
};
