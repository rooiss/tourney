export interface Teammate {
  email?: string
  firstName?: string
  lastNameLetter?: string
  id?: string
}

export enum TeamRole {
  CAPTAIN = 'captain',
  PLAYER = 'player',
}

export enum TeamInviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface TeamInvite {
  id?: string
  teamName: string
  email: string
  firstName?: string
  lastNameLetter?: string
  username?: string
  userId?: string
  status: TeamInviteStatus
  tournamentId: string
}

export type Teammates = Teammate[]
