import fetchFromApi from '../services/fetchAPI.js';

async function login(username, password) {
  const users = await fetchFromApi('users');
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    user.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  throw new Error('Login failed');
}

function logout() {
  localStorage.removeItem('user');
}

function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.isLoggedIn;
}

export { login, logout, isAuthenticated };
