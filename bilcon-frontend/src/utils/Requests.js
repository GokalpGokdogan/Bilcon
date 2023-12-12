import axios from 'axios';

const API_HOST = "localhost:3000"

//Register
export const register = async (name, email, id, password) => {
    const body = { 'name': name, 'email': email, 'id': id, 'password': password }
    let res = await axios({
        method: 'post',
        url: `http://${API_HOST}/register`,
        headers: {'Content-Type': 'application/json',},
        data: body
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
        data: body
    })
    console.log(res.data);
    return res.data
}

/* axios.post('http://localhost:3000/register', {
    "name": "öykü",
    "email": "oykudemir2003@gmail.com",
    "id": 128,
    "password": "abc1234"
}, {
headers: {
    'Content-Type': 'application/json',
},
})
.then((response) => {
    // Handle the response data
    console.log(response.data);
})
.catch((error) => {
    // Handle errors
    console.error('Error:', error);
}); */