export const emailNotTaken = (email: string | undefined): Promise<boolean> => {
  if (typeof email !== 'string') {
    return Promise.resolve(false)
  }
  return fetch('/api/validate/email', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((body) => body.valid)
}
