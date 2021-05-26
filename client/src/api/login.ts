import { LoginUser } from '../types/users'

export async function login(values: LoginUser) {
  // console.log('HITTING THE API IIIIIIIIIII')
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then(
    async (res) => {
      const body = await res.json()
      return {
        body,
        status: res.status,
      }
    },
    () => {
      return {
        body: {
          success: false,
        },
        status: 500,
      }
    },
  )
}
