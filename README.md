# acs-3210-serverless-challenge
ACS-3210 Serverless Challenge

### Serverless Deployment
Deployed serveless application can be found here: [https://jg5g34kdo2.execute-api.us-east-1.amazonaws.com/dev](https://jg5g34kdo2.execute-api.us-east-1.amazonaws.com/dev)

### Available routes

*`GET` requests must be sent with NO BODY*
- `GET /` - Public - Landing page for the API
- `GET /roll` - Public - Roll a twenty-sided die
- `GET /users/<userId>` - Private - Shows the id and name for a user with the provided `userId`
- `GET /pokemon/<pokemonName>` - Private - Shows the nickname and type for a pokemon with the provided `pokemonName`

- `POST /users`
  - Request body takes a JSON object with `name` and `userId` attributes
- `POST /pokemon`
  - Request body takes a JSON object with `pokemonName` and `pokemonType` attributes
