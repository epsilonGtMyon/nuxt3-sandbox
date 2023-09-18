import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { getDocClient } from "~/common/server/dynamodb/docClient";

type UserListSearchRequest = {
  firstName: string;
  familyName: string;
};
function validateRequest(data: unknown) {
  const errors: unknown[] = [];
  const req = data as UserListSearchRequest;

  //なにかチェックがあれば

  if (errors.length > 0) {
    throw errors;
  }
  return true;
}

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery<UserListSearchRequest>(
    event,
    validateRequest
  );

  const filterExpressions: string[] = [];
  const expressionAttributeValues: Record<string, any> = {};
  if (query.firstName !== "") {
    filterExpressions.push("firstName = :firstName");
    expressionAttributeValues[":firstName"] = query.firstName;
  }

  if (query.familyName !== "") {
    filterExpressions.push("familyName = :familyName");
    expressionAttributeValues[":familyName"] = query.familyName;
  }

  const input: ScanCommandInput = {
    TableName: "users",
  };
  if (filterExpressions.length > 0) {
    input["FilterExpression"] = filterExpressions.join(" and ");
    input["ExpressionAttributeValues"] = expressionAttributeValues;
  }

  const command = new ScanCommand(input);
  const docClient = getDocClient();
  // 1回でとれる件数に制限があったような..
  const response = await docClient.send(command);
  return response.Items;
});
