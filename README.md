# Express TypeScript API with Serverless Framework and DynamoDB

This project demonstrates how to develop and deploy a Node.js API service using Express and TypeScript, with a DynamoDB database, all running on AWS Lambda via the Serverless Framework. It also includes the ability to develop locally with `serverless-offline`.

## Features

- **Express.js** for handling routes and HTTP requests.
- **TypeScript** for static typing and better code maintainability.
- **DynamoDB** for user data storage.
- **Serverless Framework** for easy deployment to AWS Lambda.
- **Serverless Offline** for local development and testing.

## Prerequisites

- Node.js and npm installed on your machine.
- An AWS account and configured credentials for deployment.

## Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd <repo-name>
npm install
```

## Local Offline Development

To develop locally, use `serverless-offline` and `serverless-dynamodb`:

1. Install Serverless DynamoDB:

   ```bash
   serverless dynamodb install
   ```

2. Start the local server:

   ```bash
   npm run offline
   ```

This will start:
- A local API server on `http://localhost:3000`
- A local DynamoDB emulator on port 8001

You can now test your endpoints locally:

```bash
# Create a user
curl --request POST 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "John", "userId": "someUserId"}'

# Get a user
curl http://localhost:3000/users/someUserId
```

## Deployment

To deploy your service to AWS, run:

```bash
serverless deploy
```

After deployment, you'll see output similar to:

```
Service deployed to stack express-nosql-serverless-dev
endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: express-nosql-serverless-dev-api
```

## Usage

### Create a User

To create a new user, send a POST request to the `/users` endpoint:

```bash
curl --request POST 'https://xxxxxx.execute-api.us-east-1.amazonaws.com/users' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "John", "userId": "someUserId"}'
```

### Get a User

To retrieve a user by `userId`, send a GET request to the `/users/:userId` endpoint:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/users/someUserId
```

## Notes

- Make sure your DynamoDB table is properly configured and IAM permissions are in place to allow DynamoDB access.
- For production deployments, consider adding an authorizer to secure your API.

## Contributing

Contributions are welcome. Please submit a pull request for any improvements or fixes.

## License

This project is licensed under the MIT License.