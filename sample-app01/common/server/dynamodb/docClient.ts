import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getClient } from "./client.js";

const docClient = DynamoDBDocumentClient.from(getClient());

function getDocClient() {
  return docClient;
}

export { getDocClient };
