export const ClearSessionStorage = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("loginUser");
  localStorage.removeItem("providerGroup");
};