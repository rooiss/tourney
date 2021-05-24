import { SignUpCred } from '../types/users'

// we use SignUpCred because typescript needs to know what types the values are
export async function signup(values: SignUpCred) {
  return fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => res.json())
}
