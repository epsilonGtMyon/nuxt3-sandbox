import { GetCommand  } from "@aws-sdk/lib-dynamodb";
import { getDocClient } from "~/common/server/dynamodb/docClient";



type UserEditFindRequest = {
  userId: string;
};
function validateRequest(data: unknown) {
  const errors = [];
  const req = data as UserEditFindRequest;

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
  const query = await getValidatedQuery<UserEditFindRequest>(
    event,
    validateRequest
  );
  const userId = query.userId

  const command = new GetCommand({
    TableName: "users",
    Key: {
      userId
    },
  });

  const docClient = getDocClient();
  const response = await docClient.send(command);
  return response.Item;
});
