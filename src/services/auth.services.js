import axios from "axios";
const API_URL = "http://192.168.0.8:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    try {
      if (!localStorage.user) return undefined;
      return JSON.parse(localStorage.user);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthService();
