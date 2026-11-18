const KEY = "betterwill_token";

export function saveToken(token, remember) {
  clearToken();
  (remember ? localStorage : sessionStorage).setItem(KEY, token);
}

export function getToken() {
  return localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
}

export function clearToken() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}