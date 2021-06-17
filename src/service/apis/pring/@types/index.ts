/* eslint-disable */
export type ErrorResponse = {
  /** エラー発生時に設定されるエラーコード。 詳細は、エラーコード一覧（別紙）を参照。 */
  code: string;
  /** エラー発生時に設定されるエラーメッセージ。 詳細は、エラーコード一覧（別紙）を参照。 */
  message: string;
  /** エラー発生時に設定される、エラー検知フィールド。 フィールドが存在しない場合は、空欄となる。 */
  field: string;
};

export type UnauthorizedResponse = {
  /** エラー発生時に設定されるエラーコード。 詳細は、エラーコード一覧（別紙）を参照。 */
  code: string;
  /** エラー発生時に設定されるエラーメッセージ。 詳細は、エラーコード一覧（別紙）を参照。 */
  message: string;
  /** エラー発生時に設定される、エラー検知フィールド。 フィールドが存在しない場合は、空欄となる。 */
  field: string;
};

export type VersionErrorResponse = {
  /** エラー発生時に設定されるエラーコード。 詳細は、エラーコード一覧（別紙）を参照。 */
  code: string;
  /** エラー発生時に設定されるエラーメッセージ。 詳細は、エラーコード一覧（別紙）を参照。 */
  message: string;
  /** エラー発生時に設定される、エラー検知フィールド。 フィールドが存在しない場合は、空欄となる。 */
  field: string;
};

export type SystemResponse = {
  /** エラー発生時に設定されるエラーコード。 詳細は、エラーコード一覧（別紙）を参照。 */
  code: string;
  /** エラー発生時に設定されるエラーメッセージ。 詳細は、エラーコード一覧（別紙）を参照。 */
  message: string;
  /** エラー発生時に設定される、エラー検知フィールド。 フィールドが存在しない場合は、空欄となる。 */
  field: string;
};

export type Maintenance = {
  code: string;
  /** メンテナンスに関するお知らせ。 */
  message: string;
};
