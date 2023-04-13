import { AES, enc } from "crypto-js";
import { AESKEY } from "../services/APIUtils";

const decryptData = (encryptedData) => {
  const decryptedData = JSON.parse(
    AES.decrypt(encryptedData, AESKEY).toString(enc.Utf8)
  );
  return decryptedData;
};

export default decryptData;
