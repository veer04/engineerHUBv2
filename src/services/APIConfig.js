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
};

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
};

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
};

export const getResources = (setResourceData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/resource`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setResourceData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getInternship = (setInternshipData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/internship`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setInternshipData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getEvents = (setEventData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/event`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setEventData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getHiring = (setHiringData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/hiring`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setHiringData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getTeam = (setTeamData) => {
  const cancelToken = axios.CancelToken.source();
  axios
    .get(`${API_URL}api/v1/team`, {
      cancelToken: cancelToken.token,
    })
    .then((res) => setTeamData([...res.data]))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};
