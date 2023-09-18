import crypto from "node:crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDocClient } from "~/common/server/dynamodb/docClient";

type UserEditRegisterRequest = {
  userId?: string;
  firstName: string;
  familyName: string;
};

// とりあえず雑に実装
// h3/src/utils/internal/validate.ts を参照
function validateRequest(data: unknown) {
  const errors = [];

  const req = data as UserEditRegisterRequest;
  // firstName
  if (req.firstName == null || req.firstName === "") {
    errors.push({
      name: "firstName",
      message: "必須です。",
    });
  }
  if (req.firstName.length > 10) {
    errors.push({
      name: "firstName",
      message: "10文字以内で入力してください。",
    });
  }

  // familyName
  if (req.familyName == null || req.familyName === "") {
    errors.push({
      name: "familyName",
      message: "必須です。",
    });
  }
  if (req.familyName.length > 10) {
    errors.push({
      name: "familyName",
      message: "10文字以内で入力してください。",
    });
  }

  if (errors.length > 0) {
    throw errors;
  }

  return true;
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody<UserEditRegisterRequest>(
    event,
    validateRequest
  );

  const userId = body.userId || crypto.randomUUID();

  const command = new PutCommand({
    TableName: "users",
    Item: {
      userId,
      firstName: body.firstName,
      familyName: body.familyName,
      updatedAt: new Date().toISOString()
    },
  });

  const docClient = getDocClient();
  const response = await docClient.send(command);

  return {
    userId,
  };
});
