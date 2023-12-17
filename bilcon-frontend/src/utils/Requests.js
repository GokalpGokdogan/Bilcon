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
        window.location.href = res.data.redirect;
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
  
      if (res.data && res.data.redirect) {
        // Manually handle the redirect
        window.location.href = res.data.redirect;
      }
      if (res.data) {
        console.log(res.data);
      }
      return res.data;
    } catch (error) {
      console.error('Error in getItems:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

export const findUserChats = async (userId) => {
  try {
    const params = {userId};
    const res = await axios({
      method: 'get',
      url: `http://${API_HOST}/findUserChats`,
      headers: { 'Content-Type': 'application/json' },
      params,
      withCredentials: true
  });
  if (res.data && res.data.redirect) {
    // Manually handle the redirect
    window.location.href = res.data.redirect;
}
    if (res.data) {
      console.log(res.data);
    }

    return res.data;
  } catch (error) {
    console.error('Error in getItems:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const addItemToFavoritesList = async (itemId, itemType) => {
    const body = {'itemId': itemId, 'itemType': itemType};
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/addItemToFavoritesList`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });
  if (res.data && res.data.redirect) {
    // Manually handle the redirect
    window.location.href = res.data.redirect;
}
    return res.data;
};

 export const removeItemFromFavoritesList = async (itemId, itemType) => {
  const body = {'itemId': itemId, 'itemType': itemType};
  const res = await axios({
    method: 'post',
    url: `http://${API_HOST}/removeItemFromFavoritesList`,
    headers: { 'Content-Type': 'application/json' },
    data: body,
    withCredentials: true
});
if (res.data && res.data.redirect) {
  // Manually handle the redirect
  window.location.href = res.data.redirect;
}
  return res.data;
};

export const getAllItems = async (offset, itemType, onlyPostedByOthers) => {
  try {
    const body = {'offset': offset, 'itemType': itemType, 'onlyPostedByOthers': onlyPostedByOthers };
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/getAllItems`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });
  if (res.data && res.data.redirect) {
    // Manually handle the redirect
    window.location.href = res.data.redirect;
}
    if (res.data) {
      console.log(res.data);
    }

    return res.data;
  } catch (error) {
    console.error('Error in getItems:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const searchAllItems = async (
    offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay,
    maxMonth, maxYear, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar,
    availabilityDuration, searchQuery, onlyPostedByOthers  
) => {
  try {
    const body = {
      'offset': offset,
      'itemType': itemType,
      'minPrice': minPrice,
      'maxPrice': maxPrice,
      'minDay': minDay,
      'minMonth': minMonth,
      'minYear': minYear,
      'maxDay': maxDay,
      'maxMonth': maxMonth,
      'maxYear': maxYear,
      'durationOfPrice': durationOfPrice,
      'minAvailabilityScalar': minAvailabilityScalar,
      'maxAvailabilityScalar': maxAvailabilityScalar,
      'availabilityDuration': availabilityDuration,
      'searchQuery': searchQuery,
      'onlyPostedByOthers': onlyPostedByOthers
    };

    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/searchAllItems`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });
  if (res.data && res.data.redirect) {
    // Manually handle the redirect
    window.location.href = res.data.redirect;
}
    if (res.data) {
      console.log(res.data);
    }

    return res.data;
  } catch (error) {
    console.error('Error in searchItems:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const filterAllItems = async (
  offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay,
  maxMonth, maxYear, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar,
  availabilityDuration, courseName, sectionNo, wantToGive, sortBy, onlyPostedByOthers  
) => {
try {
  const body = {
    'offset': offset,
    'itemType': itemType,
    'minPrice': minPrice,
    'maxPrice': maxPrice,
    'minDay': minDay,
    'minMonth': minMonth,
    'minYear': minYear,
    'maxDay': maxDay,
    'maxMonth': maxMonth,
    'maxYear': maxYear,
    'durationOfPrice': durationOfPrice,
    'minAvailabilityScalar': minAvailabilityScalar,
    'maxAvailabilityScalar': maxAvailabilityScalar,
    'availabilityDuration': availabilityDuration,
    "courseName": courseName,
    "sectionNo": sectionNo,
    "wantToGive": wantToGive,
    "sortBy": sortBy,
    'onlyPostedByOthers': onlyPostedByOthers
  };

  const res = await axios({
    method: 'post',
    url: `http://${API_HOST}/filterAllItems`,
    headers: { 'Content-Type': 'application/json' },
    data: body,
    withCredentials: true
});
if (res.data && res.data.redirect) {
  // Manually handle the redirect
  window.location.href = res.data.redirect;
}
  if (res.data) {
    console.log(res.data);
  }

  return res.data;
} catch (error) {
  console.error('Error in searchItems:', error);
  throw error; // Rethrow the error to handle it in the component
}
};

export const postItem = async (formData) => {
  try {
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/postItem`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      withCredentials: true
  });
  if (res.data && res.data.redirect) {
    // Manually handle the redirect
    window.location.href = res.data.redirect;
  }
    if (res.data) {
      console.log(res.data);
    }

    return res.data;
  } catch (error) {
    console.error('Error in searchItems:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getAllItemsInFavoritesList = async (offset, itemType) => {
  try {
    const body = {'offset': offset, 'itemType': itemType };
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/getAllItemsInFavoritesList`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error in getItems:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getItemsOfPoster = async (nameOfPoster, itemType, numberOfItems, offset) => {
  try {
    const body = { 'nameOfPoster':nameOfPoster, 'itemType':itemType, 'numberOfItems': numberOfItems, 'offset': offset };
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/getItemsOfPoster`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
    });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getItemWithItemId = async (itemId, itemType) => {
  try {
    const body = {'itemId': itemId, 'itemType': itemType };
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/getItemWithItemId`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const sendMessage = async (participants, text, sentFrom) => {
  try {
    const body = {"participants": participants, "text": text, "sentFrom": sentFrom};
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/sendMessage`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};


export const createConversation = async (participants) => {
  try {
    const body = {"participants": participants};
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/createConversation`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};


export const getConversation = async (participants) => {
  try {
    const body = {"participants": participants};
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/getConversation`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getAllConversations = async (participant) => {
  try {
    const body = {"participant": participant};
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/getAllConversations`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const forgotPassword = async (studentIdOfUser) => {
  try {
    const body = {"id": studentIdOfUser};
    const res = await axios({
      method: 'post',
      url: `http://${API_HOST}/forgotPassword`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true
  });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// export const getItemsOfPoster = async (nameOfPoster, itemType, numberOfItems, offset) => {
//   try {
//     const body = { 'nameOfPoster':nameOfPoster, 'itemType':itemType, 'numberOfItems': numberOfItems, 'offset': offset };
//     const res = await axios({
//       method: 'post',
//       url: `http://${API_HOST}/getItemsOfPoster`,
//       headers: { 'Content-Type': 'application/json' },
//       data: body,
//       withCredentials: true
//     });

//     if (res.data && res.data.redirect) {
//       // Manually handle the redirect
//       window.location.href = res.data.redirect;
//     }
//     if (res.data) {
//       console.log(res.data);
//     }
//     return res.data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error; // Rethrow the error to handle it in the component
//   }
// };


let userId; 

export const getUserId = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: `http://${API_HOST}/forgotPassword,`,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    if (res.data && res.data.redirect) {
      // Manually handle the redirect
      window.location.href = res.data.redirect;
    }
    if (res.data) {
      console.log(res.data);
      userId = res.data; // Assign a value to the variable
    }
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export { userId }; // Export the variable