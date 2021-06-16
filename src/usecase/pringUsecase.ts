import { fetchSSMParam } from "../service/awsSsmClient";

interface AuthorizePringAppUrlParams {
  orderId: string;
}

export class PringUsecase {
  /**
   *  Generate URL for linking with pring app
   */
  public async authorizePringAppUrl(
    params: AuthorizePringAppUrlParams
  ): Promise<string> {
    const [clientId, printScheme] = await Promise.all([
      fetchSSMParam(process.env.PRING_CLIENT_ID || ""),
      fetchSSMParam(process.env.PRING_SCHEME || ""),
    ]);
    const state = "DUMMY";
    const scope = "connected_payments";
    const additionalParam = params.orderId;
    return `${printScheme}://pring.app/auth/authorize?client_id=${clientId}&state=${state}&scope=${scope}&additional_param=${additionalParam}`;
  }
}
