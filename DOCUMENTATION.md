# LoanDistro API Documentation

This doc provides a simple and temp description of routes, requirements and responses, etc, of this API service.

Please note:
* all **500** errors are internal server errors.
* POST requests with data must be in JSON format.

## PROVIDERS

**GET** `/provider/id` Returns a provider record.

**responses**

200
```json
{
  "message": "Successfully obtained provider",
  "provider": {
      "_id": "5f74415bc5fe5314f8658a41",
      "businessName": "Business 2",
      "address": "VI, Lagos",
      "email": "t2b@tb.org",
      "phoneNumber": "08099888880",
      "shortid": "O1unRp0Zs",
      "created": "2020-09-30T08:27:07.153Z",
      "__v": 0
  }
}
```
**POST** `/provider` Creates a new provider record

**params** 
```json
{
  "businessName": "Business 2",
  "address": "VI, Lagos",
  "email": "t2b@tb.org",
  "phoneNumber": "08099888880",
}
```
**responses**

201
```json
{
  "message": "Successfully created new provider",
  "provider": {
      "_id": "5f74415bc5fe5314f8658a41",
      "businessName": "Business 2",
      "address": "VI, Lagos",
      "email": "t2b@tb.org",
      "phoneNumber": "08099888880",
      "shortid": "O1unRp0Zs",
      "created": "2020-09-30T08:27:07.153Z",
      "__v": 0
  }
}
```
400
```json
{
  "message": "Missing params email"
}
```
***
## LOAN APPLICATIONS
**POST** `/apply/shortid` Creates a new loan application record tied to a provider _shortid_

**params** 
```json
{
  "name": "Mary Jane",
  "address": "Lekki Industrial estate Road, Lagos",
  "email": "mj@codebiz.org",
  "phoneNumber": "08063456789",
  "amount": 250000
}
```
**responses**

201
```json
{
  "message": "Successfully created new loan application",
  "loanApplication": {
    "status": "pending",
    "_id": "5f75de38ded7852228cc5121",
    "name": "Mary Jane",
    "address": "Lekki Industrial estate Road, Lagos",
    "email": "mj@codebiz.org",
    "phoneNumber": "08063456789",
    "amount": 250000,
    "provider": "5f74415bc5fe5314f8658a41",
    "creditScore": 313,
    "created": "2020-10-01T13:48:40.182Z",
    "__v": 0
  }
}
```
400
```json
{
  "message": "Missing params email"
}
```