import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function deleteCookie() {
  // Remove all cookies and log out the user
  const cookiesToRemove = [
    "userName",
    "refresh_token",
    "access_token",
    "email",
    "institutionName",
    "image",
    "isVerified",
    "phoneNumber",
    "isPhoneNumberVerified",
    "name",
    "verifiedByEhub",
    "role",
    "mobile",
  ];

  //delete all cookies
  cookiesToRemove.forEach((cookie) => {
    Cookies.remove(cookie);
  });
}

export async function handleLogout() {
  await deleteCookie();
  // setTimeout(() => {
  //   setIsLoggedIn(false);
  //   setName("");
  window.location.reload(true);
  // }, 1000);
}
