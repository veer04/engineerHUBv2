const redirectToAuth = (path, redirectPath = "") => {
  sessionStorage.setItem("redirectToAuth", true);
  sessionStorage.setItem(
    "redirectToAuthLink",
    !redirectPath ? window.location.pathname : redirectPath
  );
  window.location.href = `${path}`;
};

export { redirectToAuth };
