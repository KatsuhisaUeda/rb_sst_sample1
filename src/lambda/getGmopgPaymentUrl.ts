import {
  GetParameterCommand,
  GetParameterCommandOutput,
  SSMClient,
} from "@aws-sdk/client-ssm";
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ulid } from "ulid";

import { SampleUsecase } from "../usecase/sampleUsecase";

interface PaymentPayload {
  amount: number;
}

function isPaymentPayload(obj: unknown): obj is PaymentPayload {
  if (typeof obj == "object" && obj != null) {
    const payload = obj as PaymentPayload;
    return typeof payload.amount == "number";
  }
  return false;
}

async function fetchSSMParam(name: string): Promise<string> {
  const client = new SSMClient({ region: "ap-northeast-1" });
  const result: GetParameterCommandOutput = await client.send(
    new GetParameterCommand({ Name: name, WithDecryption: true })
  );
  return result.Parameter?.Value || "";
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
  const orderId = ulid();
  const [shopId, shopPass] = await Promise.all([
    fetchSSMParam(process.env.GMOPG_SHOP_ID || ""),
    fetchSSMParam(process.env.GMOPG_SHOP_PASS || ""),
  ]);
  const result = await new SampleUsecase().requestPaymentUrl(
    shopId,
    shopPass,
    orderId,
    payload.amount
  );
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
