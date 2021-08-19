export async function acceptTeamInvite({ teamInviteId, tournamentId }) {
  return fetch(`/api/tournaments/${tournamentId}/${teamInviteId}/reject`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ teamInviteId }),
  }).then((res) => res.json())
}
