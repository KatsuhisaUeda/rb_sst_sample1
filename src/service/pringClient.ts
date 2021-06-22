import aspida, { FetchConfig } from "@aspida/node-fetch";
import { AspidaClient } from "aspida";
import { AES, enc, mode, pad } from "crypto-js";
import fetch from "node-fetch";

import pringapi from "./apis/pring/$api";

const pringApiVersion = "1.0.5";

export function encryptCode(code: string, key: string, iv: string): string {
  const encrypted = AES.encrypt(enc.Utf8.parse(code), enc.Utf8.parse(key), {
    iv: enc.Utf8.parse(iv),
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return encrypted.toString();
}

export interface GetAccessTokenBody {
  appAuthCode: string;
  grantType?: "authorization_code" | "refresh_token";
  refreshToken?: string;
}

interface GetAccessTokenError {
  code: string;
  message: string;
  field: string;
}

interface GetAccessTokenResult {
  access_token: string;
  token_type: string;
  access_token_expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: "connected_payments" | "connected_continuations";
  errors?: GetAccessTokenError[];
}

export class PringClient {
  private aspidaClient: AspidaClient<FetchConfig>;

  constructor(
    private baseUrl: string,
    private clientId: string,
    private clientSecret: string
  ) {
    this.aspidaClient = aspida(fetch, {
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  }

  /**
   * Get Pring payment API auth token
   */
  public async GetPaymentAuthToken(
    queryArgs: GetAccessTokenBody
  ): Promise<GetAccessTokenResult> {
    const pring = pringapi(this.aspidaClient);
    const response = await pring.auth.token.issue.post({
      headers: {
        "X-PRING-API-VERSION": pringApiVersion,
      },
      body: {
        client_id: this.clientId,
        code: encryptCode(
          queryArgs.appAuthCode,
          this.clientSecret,
          "PRING-EX-PAYMENT"
        ),
        grant_type: queryArgs.grantType || "authorization_code",
        refresh_token: queryArgs.refreshToken,
      },
    });
    return response.body;
  }
}
