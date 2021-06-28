### TODO

## Tournament Component

- [ ] view page for single tournament details
  - [ ] see who else is signed up for that tournament
- [ ] protectedRoute
- [x] tournament context
- [x] Grid for home component
- [x] following component in home component
- [ ] username as other column for tournament
- [ ] add tournament user context for tournaments component, conditionally render register button if not registered

## TeamRegister Component

- [ ] breadcrumbs
- [ ] search for team members
- [ ] form for adding team members
- [ ] validation for team name, no dupes, no empty string

## NodeMailer verification

- [x] user entity generated uuid
- [x] endpoint for verifyme
- [x] store function verifyme
  - [x] save user with updated verified status
- [x] make Verify component
- [x] put nodemailer logic in route
- [x] something for isVerified, check user.verified === false

## Misc

- [ ] error handling for a lot of various things
- [ ] format date to something readable

# Nice to haves

- [ ] create tournament location, google maps API lookup
- [ ] PayPal / stripe integration for payment
- [ ] waiver form when registering / DocuSign API
