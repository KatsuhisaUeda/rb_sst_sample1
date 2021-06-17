/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './auth/token/issue'
// prettier-ignore
import { Methods as Methods1 } from './auth/token/revoke'
// prettier-ignore
import { Methods as Methods2 } from './payments'
// prettier-ignore
import { Methods as Methods3 } from './payments/_client_transaction_id@string/refund'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/external/client/connected' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth/token/issue'
  const PATH1 = '/auth/token/revoke'
  const PATH2 = '/payments'
  const PATH3 = '/refund'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    auth: {
      token: {
        issue: {
          /**
           * 決済を行うためのアクセストークンを発行するためのAPIとなります。
           * @returns 正常時
           */
          post: (option: { body: Methods0['post']['reqBody'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
            fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
          /**
           * 決済を行うためのアクセストークンを発行するためのAPIとなります。
           * @returns 正常時
           */
          $post: (option: { body: Methods0['post']['reqBody'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
            fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH0}`
        },
        revoke: {
          /**
           * アクセストークンの失効を行います。
           */
          post: (option: { body: Methods1['post']['reqBody'], headers?: Methods1['post']['reqHeaders'], config?: T }) =>
            fetch<void, BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).send(),
          /**
           * アクセストークンの失効を行います。
           */
          $post: (option: { body: Methods1['post']['reqBody'], headers?: Methods1['post']['reqHeaders'], config?: T }) =>
            fetch<void, BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).send().then(r => r.body),
          $path: () => `${prefix}${PATH1}`
        }
      }
    },
    payments: {
      _client_transaction_id: (val1: string) => {
        const prefix1 = `${PATH2}/${val1}`

        return {
          refund: {
            /**
             * 支払い済みの決済の取り消し（返金）を行います。金額の一部返金は行なえません。
             * @returns 正常時
             */
            put: (option: { body: Methods3['put']['reqBody'], headers?: Methods3['put']['reqHeaders'], config?: T }) =>
              fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, `${prefix1}${PATH3}`, PUT, option).json(),
            /**
             * 支払い済みの決済の取り消し（返金）を行います。金額の一部返金は行なえません。
             * @returns 正常時
             */
            $put: (option: { body: Methods3['put']['reqBody'], headers?: Methods3['put']['reqHeaders'], config?: T }) =>
              fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, `${prefix1}${PATH3}`, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH3}`
          }
        }
      },
      /**
       * pring決済で支払いを行います。
       * @returns 正常時
       */
      post: (option: { body: Methods2['post']['reqBody'], headers?: Methods2['post']['reqHeaders'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json(),
      /**
       * pring決済で支払いを行います。
       * @returns 正常時
       */
      $post: (option: { body: Methods2['post']['reqBody'], headers?: Methods2['post']['reqHeaders'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
