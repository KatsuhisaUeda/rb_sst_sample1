/* eslint-disable */
export type Methods = {
  /** アクセストークンの失効を行います。 */
  post: {
    reqHeaders?: {
      /** pringAPIのバージョンを指定してください。（ex:1.0.0） */
      "X-PRING-API-VERSION": string;
    };

    status: 204;

    reqBody: {
      /**
       * クライアントID。
       * 事前に共有されたclient_idを指定してください。
       */
      client_id: string;
      /**
       * リフレシュトークン。
       * 連携を解除したい対象のrefresh_tokenをclient_secretで暗号化して指定してください。
       */
      refresh_token: string;
    };
  };
};
