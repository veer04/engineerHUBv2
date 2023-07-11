import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export async function handleLogout() {
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
    "_id",
    "chatDomain",
  ];
  cookiesToRemove.forEach((cookie) => {
    Cookies.remove(cookie);
  });
  window.location.href = "/";
}
