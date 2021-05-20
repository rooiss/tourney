import { SignUpPanties } from '../types/user'

export async function signup(values: SignUpPanties) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => res.json())
}
