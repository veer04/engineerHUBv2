import axios from "axios";
import { API_URL } from "./APIUtils";
import decryptData from "../features/DeCrypt";
export const cancelToken = axios.CancelToken.source();
export const controller = new AbortController();

export const getDomains = (setDomainData) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/domainData`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setDomainData(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getProjects = (setDomainData, id) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/domainWiseProject/${id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setDomainData(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getProjectTags = (setTags, id) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/alltags/${id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setTags(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getProjectById = (setProject, id) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/project/${id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setProject(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getBlogs = (setBlogs, id) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/domainWiseBlog/${id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setBlogs(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getBlogById = (setBlog, id) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/blog/${id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setBlog(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllEvents = (setEvents) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/event`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setEvents(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getEvents = (setEvents, id) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/eventDomainWise/${id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setEvents(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getEventById = (setEvent) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/event`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setEvent(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getEventByMode = (setEvents) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getEventWithEventModeType/InterCollege`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setEvents(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getReviews = (setReviews) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getReview`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      console.log(data);
      setReviews(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

// export const getCourses = async (setCourseData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/course`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setCourseData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const getHandBook = (setMagazineData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/handbook`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setMagazineData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const getMentors = (setMentorData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/mentor`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setMentorData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const getResources = (setResourceData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/resource`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setResourceData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const getInternship = (setInternshipData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/internship`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setInternshipData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const gAuth = (setData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/auth/google`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const getEvents = (setEventData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/event`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setEventData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const getHiring = (setHiringData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/hiring`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setHiringData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const getTeam = (setTeamData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/team`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setTeamData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };
// export const getIndustry = (setData) => {
//   const cancelToken = axios.CancelToken.source();
//   axios
//     .get(`${API_URL}api/v1/industry`, {
//       cancelToken: cancelToken.token,
//     })
//     .then((res) => setData([...res.data]))
//     .catch((err) => {
//       if (axios.isCancel(err)) {
//         console.log("req cancel");
//       } else {
//         console.log("req performed");
//       }
//     });
// };

// export const signInFormSubmit = async (
//   values,
//   setSnackbarValues,
//   setOpen,
//   setValidation
// ) => {
//   if (values?.email && values?.password) {
//     await axios
//       .post(`${API_URL}api/v1/signin`, {
//         email: values.email,
//         password: values.password,
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           setValidation(true);
//           setSnackbarValues({
//             severity: "success",
//             message: "SuccessFully Logged in",
//           });
//           axios.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${response["token"]}`;

//           setOpen(true);
//         }
//       })
//       .catch((err) => {
//         setOpen(true);
//         setSnackbarValues({
//           severity: "error",
//           message: "User doesn't exist Check again!",
//         });
//       });
//   }
// };
