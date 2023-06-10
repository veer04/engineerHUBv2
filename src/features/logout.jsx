import Cookies from "js-cookie";

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
  ];
  cookiesToRemove.forEach((cookie) => {
    Cookies.remove(cookie);
  });
  window.location.reload(true);
}
