import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import express, { Request, Response, NextFunction } from "express";
import serverless from "serverless-http";

const app = express();

const USERS_TABLE = process.env.USERS_TABLE as string;

let clientConfig = {};

if (process.env.IS_OFFLINE) {
  clientConfig = {
    region: "localhost",
    endpoint: "http://0.0.0.0:8001",
    credentials: {
      accessKeyId: "MockAccessKeyId",
      secretAccessKey: "MockSecretAccessKey",
    },
  };
}

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient(clientConfig));

app.use(express.json());

app.get("/users/:userId", async (req: Request, res: Response) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, name } = Item as { userId: string; name: string };
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  console.log("get users");
  const params = {
    TableName: USERS_TABLE,
  };

  try {
    const command = new ScanCommand(params);
    const { Items } = await docClient.send(command);
    res.json(Items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve users" });
  }
});

async function createUser(req: Request, res: Response) {
  const { userId, name } = req.body;

  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { userId, name },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ userId, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
}

app.post("/users", createUser);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: "Not Found",
  });
  next();
});

exports.handler = serverless(app);

exports.helloWorld = async (event: any) => {
  return {
    statusCode: 200,
    body: "Hello, world !",
  };
};
