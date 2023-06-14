import axios from "axios";
import { API_URL } from "./APIUtils";
import decryptData from "../features/DeCrypt";
import { getAccessToken } from "../features/getCookieValues";
import { set } from "react-hook-form";
export const cancelToken = axios.CancelToken.source();
export const controller = new AbortController();

export const patchProfilePicture = (userId, file, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(`${API_URL}api/v1/role/profilePictureUpdate/${userId}`, file, config)
    .then((res) => {
      console.log(res);
      setResponse(res);
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
        setResponse(err);
        return err;
      } else {
        console.log("req performed");
        console.log(err);
        setResponse(err);
        return err;
      }
    });
};

export const patchStudentData = (userId, data, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/user/profileUpdate/${userId}`,
      {
        ...data,
        signal: controller.signal,
      },
      config
    )
    .then((res) => {
      console.log(res);
      setResponse(res);
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
        setResponse(err);
        return err;
      } else {
        console.log("req performed");
        setResponse(err);
        console.log(err);
        return err;
      }
    });
};

export const patchAlumniData = (alumniId, data, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/alumni/profileUpdate/${alumniId}`,
      {
        ...data,
        signal: controller.signal,
      },
      config
    )
    .then((res) => {
      console.log(res);
      setResponse(res);
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
        setResponse(err);
        return err;
      } else {
        console.log("req performed");
        setResponse(err);
        console.log(err);
        return err;
      }
    });
};

export const patchClubData = (clubId, data, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/club/profileUpdate/${clubId}`,
      {
        ...data,
        signal: controller.signal,
      },
      config
    )
    .then((res) => {
      console.log(res);
      setResponse(res);
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
        setResponse(err);
        return err;
      } else {
        console.log("req performed");
        setResponse(err);
        console.log(err);
        return err;
      }
    });
};

export const patchOrganizationData = (organizationId, data, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/organization/profileUpdate/${organizationId}`,
      {
        ...data,
        signal: controller.signal,
      },
      config
    )
    .then((res) => {
      console.log(res);
      setResponse(res);
      return res;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
        setResponse(err);
        return err;
      } else {
        console.log("req performed");
        setResponse(err);
        console.log(err);
        return err;
      }
    });
};

export const getClubProfileById = (setClubProfile, clubId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getClubProfileWithId/${clubId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setClubProfile(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getOrganizationProfileById = (
  setOrganizationProfile,
  organizationId
) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getOrganizationWithId/${organizationId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setOrganizationProfile(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAlumniProfileById = (setAlumniProfile, alumniId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getAlumniWithId/${alumniId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setAlumniProfile(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getUserProfileById = (setUserProfile, userId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getUserWithId/${userId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setUserProfile(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllCountries = (setAllCountries) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getCountries`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setAllCountries(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getStatesByCountry = (setStatesByCountry, countryCode) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getStates/${countryCode}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setStatesByCountry(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getCitiesByState = (setCitiesByState, countryCode, stateCode) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getCities/${countryCode}/${stateCode}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setCitiesByState(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllBranches = (setAllBranches) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/branch`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setAllBranches(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllCampuses = (setAllCampuses) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/campus`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setAllCampuses(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getBestAlumni = (setBestAlumni) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/allAlumni`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setBestAlumni(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getCampusAlumni = (setAlumni, collegeId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getAlumniInCampus/${collegeId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setAlumni(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAlumniById = (setAlmaData, almaId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getAlumniWithId/${almaId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setAlmaData(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

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
    .get(`${API_URL}api/v1/domainWiseProject/${encodeURIComponent(id)}`, {
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
    .get(`${API_URL}api/v1/alltags/${encodeURIComponent(id)}`, {
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
    .get(`${API_URL}api/v1/domainWiseBlog/${encodeURIComponent(id)}`, {
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

export const getFeaturedEvents = (setFeaturedEvents) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/featuredEvent`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setFeaturedEvents(data);
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
    .get(`${API_URL}api/v1/eventDomainWise/${encodeURIComponent(id)}`, {
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

export const getParticularEvent = (setEvent, eventId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/event/${eventId}`, {
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

export const getEventByMode = (setEvents, mode) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getEventWithEventModeType/${mode}`, {
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

export const getEventByType = (setEvents, type) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/eventTypeWiseEvents/${type}`, {
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

export const getCampusById = (setCampus, collegeId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/campus/${collegeId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setCampus(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getClubsByType = (setClubs, clubType, collegeId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/club/${clubType}/${collegeId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setClubs(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getClubById = (setClub, clubId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/club/${clubId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setClub(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getPostById = (setPost, postId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/club/posts/individualPost/${postId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setPost(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getTrendingClubs = (setTrendingClubs) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getAllTrendingClubs`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setTrendingClubs(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getTrendingActivities = (setTrendingActivities) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getAllTrendingActivitiesPostsWithCampus`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setTrendingActivities(data);
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
