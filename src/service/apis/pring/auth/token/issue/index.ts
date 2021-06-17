/* eslint-disable */
export type Methods = {
  /** 決済を行うためのアクセストークンを発行するためのAPIとなります。 */
  post: {
    reqHeaders?: {
      /** pringAPIのバージョンを指定してください。（ex:1.0.0） */
      "X-PRING-API-VERSION": string;
    };

    status: 200;

    /** 正常時 */
    resBody: {
      /** アクセスートークン */
      access_token: string;
      /** bearer固定 */
      token_type: string;
      /** アクセストークン有効時間（秒） */
      access_token_expires_in: number;
      /**
       * リフレッシュトークン。アクセストークンの有効期限が切れた場合は、
       * リフレッシュトークンを用いてアクセストークンの再発行を行います。
       * リフレシュトークンの期限も切れていた場合は、認可から実行し直しとなります。
       */
      refresh_token: string;
      /** リフレッシュトークン有効時間（秒） */
      refresh_token_expires_in: number;
      /** スコープ。 発行されたアクセストークンで可能なAPIを表します。 "connected_payments connected_continuations"固定です。 */
      scope: "connected_payments" | "connected_continuations";
    };

    reqBody: {
      /**
       * グラントタイプ。
       * アクセストークンの新規発行時はauthorization_code、
       * リフレッシュトークンによるアクセストークン再発行時はrefresh_tokenを指定してください。
       */
      grant_type?: "authorization_code" | "refresh_token";
      /**
       * 認可コード。
       * 認可コードをclinet_secretで暗号化して指定してください。grant_typeがrefresh_tokenの場合は不要な項目となります。
       */
      code?: string;
      /**
       * リフレシュトークン。
       * リフレシュトークンをclient_secretで暗号化して指定してください。
       * grant_typeがauthorization_codeの場合は不要項目となります。
       */
      refresh_token?: string;
      /** 事前にpringから共有されたclient_id */
      client_id: string;
    };
  };
};
