export async function createTournament(values) {
  return fetch('/api/tournaments/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => res.json())
}
