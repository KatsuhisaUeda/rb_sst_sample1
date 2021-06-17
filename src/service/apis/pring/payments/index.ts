/* eslint-disable */
export type Methods = {
  /** pring決済で支払いを行います。 */
  post: {
    reqHeaders?: {
      /**
       * アクセストークンをセットしてください。
       * ex: Authorization: Bearer access_token
       */
      Authorization: string;
      /** pringAPIのバージョンを指定してください。（ex:1.0.0） */
      "X-PRING-API-VERSION": string;
    };

    status: 200;

    /** 正常時 */
    resBody: {
      /** 取引ID。 代理店様または加盟店様で発番し、pring支払処理要求API実行時に指定したのもを返却します。 */
      client_transaction_id: string;
      /** 取引金額。 pringで支払を実行した金額を返却します。 */
      amount: number;
      /** 取引日時。 支払、返金の実行日時。RFC3339形式です。 */
      paid_at: string;
      /** 取引番号。 pringアプリの取引履歴に表示される番号。 顧客問い合わせ時に取引を見分けるために使用する。 日付ごとにユニークに採番される。 */
      order_number: string;
    };

    reqBody: {
      /**
       * 支払い金額。
       * 支払いを行う金額をセットしてください。
       */
      amount: number;
      /**
       * 取引ID。
       * 加盟店にて発行する決済を特定するための任意の文字列を指定してください。
       * 使用可能文字は、半角英数、記号(_-.@)使用可能です。
       */
      client_transaction_id: string;
      /**
       * 署名。
       * UTF8でamount、client_transaction_id, client_secretを&で連結しSHA256でハッシュ化した値を指定してください。
       * リクエスト受け取り後、pring側で生成したハッシュと比較し改竄された取引ではないことを確認します。
       * 例) 1000&payment-0001&7b60a5a5434645f3022726e29
       */
      signature: string;
    };
  };
};
