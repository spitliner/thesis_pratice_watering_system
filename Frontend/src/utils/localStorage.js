export const setAccessToken = (accessToken) => {
  localStorage.setItem('token', JSON.stringify(accessToken));
};
export const getAccessToken = () => {
  return localStorage.getItem('token');
};
