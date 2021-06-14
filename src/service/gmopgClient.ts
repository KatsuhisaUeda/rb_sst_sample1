import aspida from "@aspida/node-fetch";
import fetch from "node-fetch";

import gmoapi from "./apis/gmopg/$api";
import {
  GetLinkplusUrlPaymentBody,
  GetLinkplusUrlPaymentResult,
} from "./apis/gmopg/payment/GetLinkplusUrlPayment.json";

export class GmopgClient {
  private aspidaClient = gmoapi(
    aspida(fetch, {
      baseURL: "https://pt01.mul-pay.jp",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
  );

  /*
  Get Linkplus payment URL
  */
  public async GetLinkplusUrlPayment(
    queryArgs: GetLinkplusUrlPaymentBody
  ): Promise<GetLinkplusUrlPaymentResult> {
    const response =
      await this.aspidaClient.payment.GetLinkplusUrlPayment_json.$post({
        body: queryArgs,
      });
    return response;
  }
}
