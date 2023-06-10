export default function getCookie(key) {
  return document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
}

export function getAccessToken() {
  const token = getCookie("access_token");
  if (token === undefined || token === null || token === "") {
    return "";
  }
  return getCookie("access_token")[2];
}

export function getRefreshToken() {
  const token = getCookie("refresh_token");
  if (token === undefined || token === null || token === "") {
    return "";
  }
  return getCookie("refresh_token")[2];
}
