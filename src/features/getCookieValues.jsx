export default function getCookie(key) {
  return document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
}

export function getAccessToken() {
  return getCookie("access_token")[2];
}

export function getRefreshToken() {
  return getCookie("refresh_token")[2];
}
