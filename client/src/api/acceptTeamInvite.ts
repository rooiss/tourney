export async function acceptTeamInvite({
  teamInviteId,
  tournamentId,
  teamName,
  currentUser,
}) {
  return fetch(`/api/tournaments/${tournamentId}/${teamInviteId}/accept`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ teamInviteId, teamName, currentUser }),
  }).then((res) => res.json())
}
