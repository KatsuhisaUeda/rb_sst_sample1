import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ulid } from "ulid";

import { PringUsecase } from "../usecase/pringUsecase";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  if (event.requestContext.http.method == "OPTIONS") {
    return { statusCode: 204 };
  }
  const orderId = ulid();
  const result = await new PringUsecase().authorizePringAppUrl({ orderId });
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
