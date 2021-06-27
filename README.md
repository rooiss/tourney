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

## NodeMailer verification

- [x] user entity generated uuid
- [x] endpoint for verifyme
- [x] store function verifyme
  - [x] save user with updated verified status
- [x] make Verify component
- [x] put nodemailer logic in route
- [ ] something for isVerified, check user.verified === false
- [ ] once user clicks link for verify take params and use that to verify account

## Misc

- [ ] error handling for a lot of various things
- [ ] fix ugly ass following component

# Nice to haves

- [ ] create tournament location, google maps API lookup
- [ ] PayPal / stripe integration for payment
- [ ] waiver form when registering / DocuSign API
