const redirectToAuth = (path, redirectPath = "") => {
  sessionStorage.setItem("redirectToAuth", true);
  sessionStorage.setItem(
    "redirectToAuthLink",
    !redirectPath
      ? `${window.location.pathname}${
          window.location.search ? window.location.search : ""
        }`
      : redirectPath
  );
  window.location.href = `${path}`;
};

export { redirectToAuth };
