// export const teamNameNotTaken = (
//   teamName: string | undefined,
// ): Promise<boolean> => {
//   if (typeof teamName !== 'string') {
//     return Promise.resolve(false)
//   }
//   return fetch(`/api/validate/teamname`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify({ teamName }),
//   })
//     .then((res) => res.json())
//     .then((body) => body.valid)
// }

// export const teamNameNotTaken = (tournamentId) => (teamName) => {
//   if (typeof teamName !== 'string') {
//     return Promise.resolve(false)
//   }
//   return fetch(`/api/validate/${tournamentId}/teamname`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify({ teamName }),
//   })
//     .then((res) => res.json())
//     .then((body) => body.valid)
// }

export const teamNameNotTaken = (tournamentId, teamName) => {
  return
}
