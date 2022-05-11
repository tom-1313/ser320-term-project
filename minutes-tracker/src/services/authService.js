import jwtDecode from "jwt-decode";
import http from "./httpService";
import { login, logout } from "./userService";

const tokenKey = "token";

http.setJwt(getJwt());

export async function loginUser(info) {
  const { data: jwt } = await login(info);

  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logoutUser() {
  const respond = await logout();
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
const exportedMethods = {
  loginUser,
  loginWithJwt,
  logoutUser,
  getCurrentUser,
  getJwt,
};
export default exportedMethods;
