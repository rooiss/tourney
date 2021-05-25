import { LoginUser } from '../types/users'

export async function login(values: LoginUser) {
  // console.log('HITTING THE API IIIIIIIIIII')
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => res.json())
}
