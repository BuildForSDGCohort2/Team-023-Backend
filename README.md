[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6fbc6541da104a708987368ebe42a659)](https://app.codacy.com/gh/BuildForSDGCohort2/Team-023-Backend?utm_source=github.com&utm_medium=referral&utm_content=BuildForSDGCohort2/Team-023-Backend&utm_campaign=Badge_Grade_Settings)

# LoanDistro Backend Service

This is the API service that supports LoanDistro app.

## Local installation
To run on your local machine:
* Clone repo `git clone git@github.com:BuildForSDGCohort2/Team-023-Backend.git`
* Change into directory and install dependencies with `npm install`
* Create a **.env** file and include a property `DB_URL` whose value is the connection string to a MongoDB instance running locally or remote
* If you have **nodemon** installed run `nodemon index.js` to watch changes or just run `node index.js` to start the server

## Remote host
The service is currently hosted on Heroku and can be accessed at [https://loandistro-staging.herokuapp.com/](https://loandistro-staging.herokuapp.com/)

## Contributing
To contribute to this repo, raise (or identify) an issue and follow this [Contributing Guide](https://github.com/BuildForSDGCohort2/Team-023-Frontend/blob/develop/CONTRIBUTING.md)

## Documentation
See [DOCUMENTATION.md](https://github.com/BuildForSDGCohort2/Team-023-Backend/blob/develop/DOCUMENTATION.md) for API documentation