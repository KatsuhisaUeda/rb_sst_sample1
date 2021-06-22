import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";

import { PringUsecase } from "../usecase/pringUsecase";

interface PurchasePayload {
  appAuthCode: string;
}

function isPaymentPayload(obj: unknown): obj is PurchasePayload {
  if (typeof obj == "object" && obj != null) {
    const payload = obj as PurchasePayload;
    return typeof payload.appAuthCode == "string";
  }
  return false;
}

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  if (event.requestContext.http.method == "OPTIONS") {
    return { statusCode: 204 };
  }
  const payload = JSON.parse(event.body || "{}");
  if (!isPaymentPayload(payload)) {
    return {
      statusCode: 400,
      body: "some parameters are illegal.",
    };
  }
  const result = await new PringUsecase().purchase({
    appAuthCode: payload.appAuthCode,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };
};
