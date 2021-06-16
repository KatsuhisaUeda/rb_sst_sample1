import {
  GetLinkplusUrlPaymentBody,
  GetLinkplusUrlPaymentResult,
} from "../service/apis/gmopg/payment/GetLinkplusUrlPayment.json";
import { fetchSSMParam } from "../service/awsSsmClient";
import { GmopgClient } from "../service/gmopgClient";

interface RequestPaymentUrlParams {
  orderId: string;
  amount: number;
  guildeMailAddress?: string;
  customerName?: string;
}

export class SampleUsecase {
  /**
   * Request GMOPG payment URL
   */
  public async requestPaymentUrl(
    params: RequestPaymentUrlParams
  ): Promise<GetLinkplusUrlPaymentResult> {
    const [shopId, shopPass] = await Promise.all([
      fetchSSMParam(process.env.GMOPG_SHOP_ID || ""),
      fetchSSMParam(process.env.GMOPG_SHOP_PASS || ""),
    ]);
    const reqBody: GetLinkplusUrlPaymentBody = {
      geturlparam: {
        ShopID: shopId,
        ShopPass: shopPass,
      },
      configid: "1",
      transaction: {
        OrderID: params.orderId,
        Amount: params.amount,
      },
      credit: {},
    };
    if (params.guildeMailAddress != null) {
      reqBody.geturlparam.GuideMailSendFlag = "1";
      reqBody.geturlparam.SendMailAddress = params.guildeMailAddress;
      reqBody.geturlparam.CustomerName = params.customerName;
    }
    return new GmopgClient().GetLinkplusUrlPayment(reqBody);
  }
}
