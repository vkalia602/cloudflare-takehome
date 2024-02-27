# Certificate Management Service

## Description
Service to manage customer's certificates. 

## Instructions
Programming Exercise

This exercise should be completed in 4 hours or less. The solution must be runnable, and can be written in any programming language.

The challenge is to build a HTTP-based RESTful API for managing Customers and their Certificates. Be thoughtful about the fact that the system must eventually support millions of certificates.

A Customer:
Has a name
Has an email address
Has a password

May have zero to many Certificates

A Certificate:

Belongs to one and only one Customer
Can be either active or inactive
Has a private key
Has a certificate body

Your solution must support:

Creating/Deleting Customers

Creating Certificates

Listing all of a Customer’s Active Certificates

Activating/Deactivating Certificates. If a certificate is either activated or de-activated, add the ability to notify an external system (via an HTTP post) about that fact. You could use http://httpbin.org or http://requestb.in/ to exercise this.

Persistence (data must survive computer restarts)

Shortcuts

No authentication is required. Though the data model specifies a user password, you don’t have to implement authentication (login) or authorization (ensuring user’s can’t see each other’s data).

Though private keys in the real world are extremely sensitive, you needn’t treat them as anything other than a blob of bytes for this exercise. For the password field however, you should try to treat it as you would a typical password.

Transport/Serialization format is your choice, but the solution should be testable via curl

Anything left unspecified is left to your discretion.

## Getting Started
- run `npm install` to install all the dependencies from the package.json
- add a .env file in the root folder with the following env variable: `DATABASE="./db/sqlite.db"`
- run `npm run start:dev` to run in dev mode with continuous deployment
- run `npm run start` to run in production mode

-- All the scripts can be seen in package.json

## Specification
- There are several routes in this file for the following operations: 
-- Create new customer:
  `[POST] localhost:3000/customer`
  **Request Body**
    ```js
    {
    "name": "vasudha",
    "email": "fatstaaa",
    "password": "hello" 
    }
    ```
  **Response**
  200
    ```js
    {
      "name": "vasudha",
      "email": "vasudha@email.com",
      "password": "$2b$10$TomuEIzKLJHsrwdO01SuW.vkrqQ5kVLOTgPu50pYoagU7MwMciy3G",
      "id": "e25cf88a-dfad-4752-97f5-749ed8a8208a",
      "createdAt": "2024-02-11T22:52:32.000Z",
      "updatedAt": "2024-02-11T22:52:32.000Z"
    }
    ```
  500
    ```js
    {
      "message": "SQLITE_CONSTRAINT: UNIQUE constraint failed: customer.email"
    }
    ```

-- Get all active certificates for a customer: 

  **Request Headers**
    ```js
    {
      email: <email of existing customer>,
      password: <password for that customer account>
    }
    ```    

  **Response**
    ```js
    [
      {
        "active": true,
        "id": "678ac82e-204d-4e75-96ff-24f2ce68e5b0",
        "customerId": "e25cf88a-dfad-4752-97f5-749ed8a8208a",
        "privateKey": "string;",
        "body": "string",
        "createdAt": "2024-02-11T22:57:09.000Z",
        "updatedAt": "2024-02-11T22:57:37.000Z"
      }
    ]
    ```
-- Create new certificate for a customer
  `[POST] localhost:3000/certificate/create`
    **Request Header**
    ```js
    {
      email: <email of existing customer>,
      password: <password for that customer account>
    }
    ```

  **Response**
      ```js
      {
        "active": false,
        "customerId": "e25cf88a-dfad-4752-97f5-749ed8a8208a",
        "privateKey": "string;",
        "body": "string",
        "id": "aaf83a2a-d315-43d3-b65c-9c376b519e0b",
        "createdAt": "2024-02-11T22:54:07.000Z",
        "updatedAt": "2024-02-11T22:54:07.000Z"
      }
      ```
-- Activate an already existing certificate 
  `[PUT] localhost:3000/certificate/:certificateId/activate`
  @param: use the `id` key for the certificate in the create certificate response
    **Response**
    ```js
      { Success: boolean }
    ```
-- Deactivate already existing certificate
  `[PUT] localhost:3000/certificate/:certificateId/deactivate`
  @param: use the `id` key for the certificate in the create certificate response
    **Response**
    ```js
      { Success: boolean }
    ```
## Commentary
- This is just a beginning of a scalable service. We can add many more features to help with optimization, scalability, 
load management and monitoring. 

- Improving scalability-
  -- We need to add a middleware layer will will handle the authentication and authorization of each user. I am using email and password headers in some api calls to bypass that and grab user's customer id. This is not a scalable solution.
  -- More comprehensive Error logging and propogation with service name and controller names embedded in error messages
  -- Use a scalable database system. My design choice was due to the project constraints and prevention of overengineering.
  -- Introduce more comprehensive unit testing.
  -- Body parsing and validation of request parameters as part of the middleware
  -- Separate api routes into public and protected and further into routes of each service in their own file to imporove the scalability of the routes.
  -- performance testing and load testing of the api routes to identify any bottlenecks, latency and failures

## Assumptions
-- Omitted the key and body generation for certificate to simplify the process of certificate creation
-- Since there is no authorization or authentication, I have used email and password in the header to get user's id. I understand that this is not secure and will not scale at all.
-- Error messages are hardcoded but they will need to be in a different file with the error service to scale better
-- Response objects contain all the information from the database. In production setting this is not ideal and exposing the internal id's are a security threat as well. But to reduce the scope of this project I have not implemented that. 
-- There is no type validation middleware setup on the inbound requests either. I am assuming that the client side will always be sending the right format of the request 
# cloudflare-takehome
