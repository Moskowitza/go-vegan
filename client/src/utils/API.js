import axios from 'axios';

export default {
  // these routes should match authcontroller
  getUser() {
    // checks if there is a user saved
    return axios.get('/auth/check');
  },
  // login user
  loginUser(loginData) {
    return axios.post('/auth/signin', loginData);
  },
  // Makes a NEW user to the database (I don't think we need this one)//
  registerUser(registerData) {
    return axios.post('/auth/signup', registerData);
  },
  // logins out user
  logoutUser() {
    return axios.get('/auth/logout');
  },
  // Makes a NEW user to the database
  saveUser(userData) {
    return axios.post('/auth/signup', userData);
  },
  // Makes a NEW user to the database
  saveSanctuary(Data) {
    return axios.post('/auth/newSanctuary', Data);
  },
  getSanctuaries(data) {
    // Get all sanctuaries
    return axios.get('/auth/sanctuaries', data);
  },
  saveSearch(data) {
    return axios.post('/auth/saveSearch', data);
  },
  getSavedSanctuaries(data) {
    return axios.get(`/auth/savedSanctuaries/${data.userId}`);
  },
  getMyComments(data) {
    return axios.get(`/auth/userComments/${data.userId}`);
  },
  getSanctuary(id) {
    return axios.get(`/api/sanctuary/${id}`);
  },
  saveComment(comment) {
    return axios.post('/auth/newComment', comment);
  },
  getComments(id) {
    return axios.get(`/api/getComments${id}`);
  },
  deleteComment(data) {
    console.log(`@@@@@@@@@@${data.postId}`);
    return axios.delete(`/api/deleteComment${data.postId}`);
  },
};
