

const jwtExpired = (msg) => {
  if (msg === "jwt expired") {
    localStorage.remove('persist:godocument')
  }
};

export default jwtExpired