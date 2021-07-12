export async function createTeam(values) {
  return fetch('/api/team/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => res.json())
}
