# TODO

## Tournament Component

- [ ] replace location input with google places autocomplete

## TeamRegister Component

### front end

- [ ] add a remove teammate from the setTeammate state

### back end

- [ ] validation for team name, no dupes, no empty string
- [ ] team router
  - [ ] post for creating new team
- [ ] team store
  - [ ] store function that creates new team

## NodeMailer verification

- [x] user entity generated uuid
- [x] endpoint for verifyme
- [x] store function verifyme
  - [x] save user with updated verified status
- [x] make Verify component
- [x] put nodemailer logic in route
- [x] something for isVerified, check user.verified === false

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
