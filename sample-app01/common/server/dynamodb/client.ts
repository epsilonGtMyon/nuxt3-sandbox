import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = process.env.ENDPOINT_URL
  ? new DynamoDBClient({ endpoint: process.env.ENDPOINT_URL })
  : new DynamoDBClient();

function getClient() {
  return client;
}

export { getClient };
