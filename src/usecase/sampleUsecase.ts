import {
  GetLinkplusUrlPaymentBody,
  GetLinkplusUrlPaymentResult,
} from "../service/apis/gmopg/payment/GetLinkplusUrlPayment.json";
import { GmopgClient } from "../service/gmopgClient";

export class SampleUsecase {
  /**
   * Request GMOPG payment URL
   */
  public requestPaymentUrl(
    shopId: string,
    shopPass: string,
    orderId: string,
    amount: number,
    guildeMailAddress?: string,
    customerName?: string
  ): Promise<GetLinkplusUrlPaymentResult> {
    const reqBody: GetLinkplusUrlPaymentBody = {
      geturlparam: {
        ShopID: shopId,
        ShopPass: shopPass,
      },
      configid: "1",
      transaction: {
        OrderID: orderId,
        Amount: amount,
      },
      credit: {},
    };
    if (guildeMailAddress != null) {
      reqBody.geturlparam.GuideMailSendFlag = "1";
      reqBody.geturlparam.SendMailAddress = guildeMailAddress;
      reqBody.geturlparam.CustomerName = customerName;
    }
    return new GmopgClient().GetLinkplusUrlPayment(reqBody);
  }
}
