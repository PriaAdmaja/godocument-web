const jwtExpired = (msg) => {
  if (msg === "jwt expired") {
    localStorage.clear();
    window.location.reload()
  }
};

export default jwtExpired;
