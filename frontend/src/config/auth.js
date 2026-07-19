// Manejo simple de la sesión del artista (token JWT en localStorage)

const TOKEN_KEY = 'galeria_token'
const USER_KEY = 'galeria_user'

export function saveSession(token, username) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, username)
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUsername() {
  return localStorage.getItem(USER_KEY)
}

export function isLoggedIn() {
  return !!getToken()
}

// Headers de autorización para las peticiones protegidas
export function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
