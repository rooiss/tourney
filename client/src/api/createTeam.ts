export async function createTeam({
  tournamentId,
  teammates,
  captain,
  teamName,
}) {
  return fetch(`/api/tournaments/${tournamentId}/teams`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ teammates, captain, teamName }),
  }).then((res) => res.json())
}
