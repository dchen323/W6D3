const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },
  
  unfollowUser: id => {
    
    return $.ajax({
      type: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },
  
  searchUsers: (queryVal, success) =>{
    return $.ajax({
      type: 'GET',
      url: "/users/search",
      dataType: 'json',
      data: {
        query: queryVal
      }
    });
  }
};


module.exports = APIUtil;