export interface Teammate {
  email: string
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
