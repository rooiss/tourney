# TODO

## Team Invite flow

- [ ] create team invite entity
- [ ] on team creation adding the row

## TeamRegister Component

### back end

- [ ] validation for team name, no dupes, no empty string
- [ ] team router
  - [ ] post for creating new team

## NodeMailer verification

- [ ] once register button is clicked send emails out to all players of the tournament to confirm

## Follow up

- [ ] username as other column for tournament
- [ ] protectedRoute
- [ ] email obfuscation
- [ ] format and divisions for tournament entity and create tournament page
  - [ ] title of tournament is `${username}'s ${tournament.format} on ${tournament.date}`
- [ ] error handling for a lot of various things
- [ ] format date to something readable
- [ ] add division to tournament entity

## Nice to haves

- [ ] create tournament location, google maps API lookup
- [ ] PayPal / stripe integration for payment
- [ ] waiver form when registering / DocuSign API
