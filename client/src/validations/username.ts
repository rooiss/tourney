export const usernameNotTaken = (
  username: string | undefined,
): Promise<boolean> => {
  if (typeof username !== 'string') {
    return Promise.resolve(false)
  }
  return fetch('/api/validate/username', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ username }),
  })
    .then((res) => res.json())
    .then((body) => body.valid)
}
