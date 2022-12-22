import axios from "axios";
import { API_URL } from "./APIUtils";

export const cancelToken = axios.CancelToken.source();

export const getCourses = async (setCourseData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/course`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setCourseData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getHandBook = (setMagazineData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/handbook`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setMagazineData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
}

export const getDomains = (setDomainData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/domain`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setDomainData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
}

export const getMentors = (setMentorData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/mentor`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setMentorData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
}

  