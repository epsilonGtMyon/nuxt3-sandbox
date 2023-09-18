import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { getDocClient } from "~/common/server/dynamodb/docClient";


type UserEditRemoveRequest = {
  userId: string;
};
function validateRequest(data: unknown) {
  const errors = [];

  const req = data as UserEditRemoveRequest;
  // userId
  if (req.userId == null || req.userId === "") {
    errors.push({
      name: "userId",
      message: "必須です。",
    });
  }
  if (errors.length > 0) {
    throw errors;
  }

  return true;
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody<UserEditRemoveRequest>(
    event,
    validateRequest
  );
  
  const userId = body.userId

  const command = new DeleteCommand({
    TableName: "users",
    Key: {
      userId
    },
  });
  
  const docClient = getDocClient();
  const response = await docClient.send(command);

  sendNoContent(event)
});
