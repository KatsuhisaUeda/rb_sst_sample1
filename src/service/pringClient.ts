import { AES, enc, mode, pad } from "crypto-js";

export function encryptCode(code: string, key: string, iv: string): string {
  const encrypted = AES.encrypt(enc.Utf8.parse(code), enc.Utf8.parse(key), {
    iv: enc.Utf8.parse(iv),
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return encrypted.toString();
}
