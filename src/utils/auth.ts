const key = "access_token"
const user_key="access_user"
export function setToken(token: string) {
  localStorage.setItem(key,token)
}

export function getToken() {
  return localStorage.getItem(key)
}

export function setUser(user:any) {
  localStorage.setItem(user_key,JSON.stringify(user))
}

export function getUser() {
  const user_str = localStorage.getItem(user_key)
  if (user_str) {
    return JSON.parse(user_str)
  } else {
    return null;
  }
  
}