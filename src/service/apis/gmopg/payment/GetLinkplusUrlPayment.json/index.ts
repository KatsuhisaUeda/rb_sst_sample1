export interface TransactionBody {
  OrderID: string;
  Amount: number;
  Tax?: number;
  ClientField1?: string;
  ClientField2?: string;
  ClientField3?: string;
  Overview?: string;
  Detail?: string;
  PayMethods?: string[];
  RetUrl?: string;
  NotifyMailaddress?: string;
  RetryMax?: number;
  ExpireDays?: number;
  PaymentExpireDate?: string;
}

export interface CustomerBody {
  MailAddress?: string;
  CustomerName?: string;
  CustomerKana?: string;
  TelNo?: string;
}

export interface DisplaysettingBody {
  TemplateID?: string;
  LogoUrl?: string;
  ShopName?: string;
  ColorPattern?: string;
  Lang?: string;
}

export interface CreditBody {
  JobCd?: string;
  Method?: string;
  PayTimes?: number;
  ItemCode?: string;
  TdFlag?: string;
  TdTenantName?: string;
  MemberID?: string;
  SecCodeRequiredFlag?: string;
  Tds2Type?: string;
}

export interface GetLinkplusUrlPaymentBody {
  geturlparam: {
    ShopID: string;
    ShopPass: string;
    GuideMailSendFlag?: string;
    ThanksMailSendFlag?: string;
    BccSendMailAddress?: string;
    FromSendMailAddress?: string;
    FromSendMailName?: string;
    SendMailAddress?: string;
    CustomerName?: string;
    TemplateNo?: string;
  };
  configid: string;
  transaction: TransactionBody;
  customer?: CustomerBody;
  displaysetting?: DisplaysettingBody;
  credit: CreditBody;
}

export interface GetLinkplusUrlPaymentResult {
  OrderID: string;
  LinkUrl: string;
  ProcessDate: string;
  WarnList?: {
    warnCode?: string;
    warnInfo?: string;
  };
  ErrCode?: string;
  ErrInfo?: string;
}

export type Methods = {
  post: {
    reqBody: GetLinkplusUrlPaymentBody;
    resBody: GetLinkplusUrlPaymentResult;
  };
};
