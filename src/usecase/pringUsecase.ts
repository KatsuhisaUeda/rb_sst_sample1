import { fetchSSMParam } from "../service/awsSsmClient";
import { GetAccessTokenBody, PringClient } from "../service/pringClient";

interface AuthorizePringAppUrlParams {
  orderId: string;
}

interface PurchaseParams {
  appAuthCode: string;
}

export class PringUsecase {
  /**
   *  Generate URL for linking with pring app
   */
  public async authorizePringAppUrl(
    params: AuthorizePringAppUrlParams
  ): Promise<string> {
    const [clientId, pringScheme] = await Promise.all([
      fetchSSMParam(process.env.PRING_CLIENT_ID || ""),
      fetchSSMParam(process.env.PRING_SCHEME || ""),
    ]);
    const state = "DUMMY";
    const scope = "connected_payments";
    const additionalParam = params.orderId;
    return `${pringScheme}://pring.app/auth/authorize?client_id=${clientId}&state=${state}&scope=${scope}&additional_param=${additionalParam}`;
  }

  /**
   *  Purchase via Pring Payment API
   */
  public async purchase(params: PurchaseParams): Promise<number> {
    const [clientId, clientSecret, pringBaseUrl] = await Promise.all([
      fetchSSMParam(process.env.PRING_CLIENT_ID || ""),
      fetchSSMParam(process.env.PRING_CLIENT_SECRET || ""),
      fetchSSMParam(process.env.PRING_API_BASE_URL || ""),
    ]);

    // Obtain access token(Pring)
    const reqBody: GetAccessTokenBody = {
      appAuthCode: params.appAuthCode,
    };
    const response = await new PringClient(
      pringBaseUrl,
      clientId,
      clientSecret
    ).GetPaymentAuthToken(reqBody);
    const accessToken = response.access_token;
    console.log("access token", accessToken);

    // Request payment(Pring)

    // Secure inventory(ANote)

    // Register order(DB)

    // Refund if failed to secure inventory(Pring)

    return 0;
  }
}
