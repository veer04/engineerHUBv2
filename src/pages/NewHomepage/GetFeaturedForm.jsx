import React from "react";
import { isUserLoggedIn } from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";

export default function GetFeaturedForm() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
    return <main></main>;
  }

  return <main>GetFeaturedForm</main>;
}
