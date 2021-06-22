import { encryptCode } from "../src/service/pringClient";

test("Encrypto code", () => {
  const encrypted = encryptCode(
    "abcde",
    "12345678901234567890123456789012",
    "1234567890123456"
  );
  /*
   * `expected` value generated at https://www.devglan.com/online-tools/aes-encryption-decryption
   */
  expect(encrypted).toEqual("XGcoF+hCDBXw5y0JAp6iwQ==");
});
