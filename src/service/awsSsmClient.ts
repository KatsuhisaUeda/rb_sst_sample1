import {
  GetParameterCommand,
  GetParameterCommandOutput,
  SSMClient,
} from "@aws-sdk/client-ssm";

/**
 * Fetch SecureString value from AWS SSM Parameter store
 */
export async function fetchSSMParam(name: string): Promise<string> {
  const client = new SSMClient({ region: "ap-northeast-1" });
  const result: GetParameterCommandOutput = await client.send(
    new GetParameterCommand({ Name: name, WithDecryption: true })
  );
  return result.Parameter?.Value || "";
}
