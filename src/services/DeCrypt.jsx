// require("dotenv").config();
import { AES, enc } from "crypto-js";
const secretKey = import.meta.env.VITE_REACT_APP_AESKEY;

const decryptData = (encryptedData) => {
  const decryptedData = JSON.parse(
    AES.decrypt(encryptedData, secretKey).toString(enc.Utf8)
  );
  return decryptedData;
};

export default decryptData;
