export async function logout() {
  return fetch('/api/users/logout')
}
