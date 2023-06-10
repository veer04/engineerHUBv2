import axios from "axios";
import { API_URL } from "../../services/APIUtils";

export default function PatchStudentData() {
  axios
    .patch(`${API_URL}api/v1/user/profileUpdate/${userId}`, data, config)
    .then(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    );
}
