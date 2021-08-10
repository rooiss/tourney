export async function createTeam({ tournamentId, teammates, captain }) {
  return fetch(`/api/tournaments/${tournamentId}/teams`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ teammates, captain }),
  }).then((res) => res.json())
}
