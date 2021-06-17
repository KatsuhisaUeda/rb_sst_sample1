/* eslint-disable */
export type Methods = {
  /** 支払い済みの決済の取り消し（返金）を行います。金額の一部返金は行なえません。 */
  put: {
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
      /**
       * 取引ID。
       * 返金を行ったclient_transaction_idを返却します。
       */
      client_transaction_id: string;
      /**
       * 金額。
       * 返金を行った金額を返却します。
       */
      amount: number;
      /**
       * 取引日時。
       * 返金を行った日時を返却します。
       */
      refund_at: string;
    };

    reqBody: {
      /**
       * 署名。
       * UTF8でorder_number、amount、client_transaction_id、 client_secretを&で連結しSHA256でハッシュ化した値を指定してください。
       * リクエスト受け取り後、pring側で生成したハッシュと比較し改竄された取引ではないことを確認します。
       * 例) 0000-0010&1000&payment-0001&7b60a5a5434645f3022726e29
       */
      signature: string;
    };
  };
};
