const redirectToAuth = (path) => {
  sessionStorage.setItem("redirectToAuth", true);
  sessionStorage.setItem("redirectToAuthLink", window.location.pathname);
  window.location.href = `${path}`;
};

export { redirectToAuth };
