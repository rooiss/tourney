export const teamNameNotTaken = (
  teamName: string | undefined,
): Promise<boolean> => {
  if (typeof teamName !== 'string') {
    return Promise.resolve(false)
  }
  return fetch('/api/validate/email', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ teamName }),
  })
    .then((res) => res.json())
    .then((body) => body.valid)
}
