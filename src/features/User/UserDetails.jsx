import getCookie from "../getCookieValues";

export function isUserLoggedIn() {
  const token = getCookie("access_token");
  if (!!token) {
    return true;
  }
  return false;
}

export function getAccessToken() {
  if (!isUserLoggedIn()) {
    console.error("Cannot get access token: User is not logged in");
  }
  const token = getCookie("access_token");
  if (!!token) {
    return decodeURIComponent(token[2]);
  }
  console.error("Cannot get access token: Access token is not set");
  return "";
}

export function getUserRole() {
  if (!isUserLoggedIn()) {
    console.error("Cannot get role: User is not logged in");
  }
  const role = getCookie("role");
  if (!!role) {
    return decodeURIComponent(role[2]);
  }
  console.error("Cannot get role: Role is not set");
  return "";
}

export function getUserEmail() {
  if (!isUserLoggedIn()) {
    console.error("Cannot get email: User is not logged in");
  }
  const email = getCookie("email");
  if (!!email) {
    return decodeURIComponent(email[2]);
  }
  console.error("Cannot get email: Email is not set");
  return "";
}

export function getUserId() {
  if (!isUserLoggedIn()) {
    console.error("Cannot get _id: User is not logged in");
  }
  const _id = getCookie("_id");
  if (!!_id) {
    return decodeURIComponent(_id[2]);
  }
  console.error("Cannot get _id: _id is not set");
  return "";
}

export function getUserFullName() {
  if (!isUserLoggedIn()) {
    console.error("Cannot get Name: User is not logged in");
  }
  const name = getCookie("name");
  if (!!name) {
    return decodeURIComponent(name[2]);
  }
  console.error("Cannot get Name: Name is not set");
  return "";
}

export function getUserName() {
  if (!isUserLoggedIn()) {
    console.error("Cannot get Username: User is not logged in");
  }
  const userName = getCookie("userName");
  if (!!userName) {
    return decodeURIComponent(userName[2]);
  }
  console.error("Cannot get userName: userName is not set");
  return "";
}

export function getUserImage() {
  if (!isUserLoggedIn()) {
    console.error("Cannot get Image: User is not logged in");
  }
  const image = getCookie("image");
  if (!!image) {
    return decodeURIComponent(image[2]);
  }
  console.error("Cannot get Image: Image is not set");
  return "";
}
