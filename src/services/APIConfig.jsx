import axios from "axios";
import { API_URL } from "./APIUtils";
import { API_URLT } from "./APIUtils";
import decryptData from "../features/DeCrypt";
import getCookie, { getAccessToken } from "../features/getCookieValues";
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

export const deleteProfilePicture = (setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  const data = {
    image:
      "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/frontend/profile/dashboard/default_profile_icon.png",
  };
  axios
    .patch(`${API_URL}api/v1/role/profilePictureDeleted`, data, config)
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

export const patchCoverImage = (file, setResponse) => {
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/clubOrganisation/backgroundPosterUpdate`,
      file,
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
        console.log(err);
        setResponse(err);
        return err;
      }
    });
};

export const patchCoverImageUsingLink = (link, setResponse) => {
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/clubOrganisation/backgroundPosterUpdateUsingLink`,
      {
        imagePoster: link,
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
        console.log(err);
        setResponse(err);
        return err;
      }
    });
};

export const patchResume = (userId, file, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(`${API_URL}api/v1/user/resumeUpdate`, file, config)
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

export const updateOrganizationDetails = (data, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/clubOrganization/profileUpdate`,
      {
        ...data,
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

export const updateClubDetails = (data, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/clubOrganization/profileUpdate`,
      {
        ...data,
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

export const followOrganization = (organizationId, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/follow/Organization/${organizationId}`,
      {
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

export const unFollowOrganization = (organizationId, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/unFollow/Organization/${organizationId}`,
      {
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
export const followClub = (clubId, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/follow/Club/${clubId}`,
      {
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

export const unFollowClub = (clubId, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .patch(
      `${API_URL}api/v1/unFollow/Club/${clubId}`,
      {
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

export const getClubProfileByIdPrivateMode = (setClubProfile, clubId) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .get(`${API_URL}api/v1/getClubWithIdWithPrivateMode/${clubId}`, config)
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

export const getOrganizationProfileByIdPrivateMode = (
  setOrganizationProfile,
  organizationId
) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .get(
      `${API_URL}api/v1/getOrganizationWithIdWithPrivateMode/${organizationId}`,
      config
    )
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

export const getProfileByRoleAndId = (setProfile, _id, role) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getAllProfileWithId/${role}/${_id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setProfile(data);
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

export const getHiringData = (setHiring) => {
  const controller = new AbortController();
  axios
    // .get(`${API_URL}api/v1/hiring/`, {
    .post(`${API_URL}api/v1/getHiring/`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setHiring(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getHiringDataById = (setHiring, hiringId) => {
  let userId = "";

  if (!!getCookie("role")) {
    if (getCookie("role")[2] === "User") {
      userId = getCookie("_id")[2];
    }
  }
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/hiring/${hiringId}/${userId}`)
    .then((res) => {
      const data = res.data.data;
      setHiring(data);
    })
    .catch((err) => {
      setHiring(err.response.data);
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllJobs2 = (setJobs) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getHiringByOpportunityType/Job`, {
      // .post(`${API_URL}api/v1/getHiringByOpportunityType/Job`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setJobs(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getJobsByOrganisationId = (organisationId, setJobs) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getHiringByOpportunityType/Job/${organisationId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setJobs(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getJobsByOrganisationIdPrivateMode = (setJobs) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .get(`${API_URL}api/v1/getHiringByOpportunityTypePrivateMode/Job`, config)
    .then((res) => {
      const data = res.data.data;
      setJobs(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};
export const getInternshipsByOrganisationId = (
  organisationId,
  setInternships
) => {
  const controller = new AbortController();
  axios
    .get(
      `${API_URL}api/v1/getHiringByOpportunityType/Internship/${organisationId}`,
      {
        signal: controller.signal,
      }
    )
    .then((res) => {
      const data = res.data.data;
      setInternships(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getInternshipsByOrganisationIdPrivateMode = (setInternships) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .get(
      `${API_URL}api/v1/getHiringByOpportunityTypePrivateMode/Internship`,
      config
    )
    .then((res) => {
      const data = res.data.data;
      setInternships(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};
export const getEventsByOrganisationId = (organisationId, setEvents) => {
  const controller = new AbortController();
  axios
    .get(
      `${API_URL}api/v1/getHiringByOpportunityType/Event/${organisationId}`,
      {
        signal: controller.signal,
      }
    )
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

export const getEventsByOrganisationIdPrivateMode = (setEvents) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .get(`${API_URL}api/v1/getHiringByOpportunityTypePrivateMode/Event`, config)
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
export const getProjectsByOrganisationId = (organisationId, setProjects) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/projectHiring/${organisationId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setProjects(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getProjectsByOrganisationIdPrivateMode = (setProjects) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .get(`${API_URL}api/v1/projectHiringPrivateMode`, config)
    .then((res) => {
      const data = res.data.data;
      setProjects(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllInternships = (setInterns) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getHiringByOpportunityType/Internship`, {
      // .post(`${API_URL}api/v1/getHiringByOpportunityType/Job`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setInterns(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllEvents2 = (setEvents) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/getHiringByOpportunityType/Event`, {
      // .post(`${API_URL}api/v1/getHiringByOpportunityType/Job`, {
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

export const getAllJobs = (setJobs) => {
  const controller = new AbortController();
  axios
    // .get(`${API_URL}api/v1/hiring/`, {
    .post(`${API_URL}api/v1/getHiring/`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data.filter((res) => res.opportunityType === "Job");
      setJobs(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getProjectData = (setProject) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/projectHiring/`, {
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

export const getProjectDataById = (setProject, projectId) => {
  let userId = "";

  if (!!getCookie("role")) {
    if (getCookie("role")[2] === "User") {
      userId = getCookie("_id")[2];
    }
  }
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/projectHiringById/${projectId}/${userId}`, {
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

export const getUserProfileById = (setUserProfile, userId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URLT}api/v1/getUserWithId/${userId}`, {
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
export const getAllEngBranches = (setAllEngBranches) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/branch`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setAllEngBranches(data);
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

export const getProjectCategories = (setProjectCategories) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/projectHiring/all/category`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setProjectCategories(data);
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
      const data = res.data.data.reverse();
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
      const data = res.data.data.reverse();
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

export const uploadNewPost = (formData, setResponse) => {
  const controller = new AbortController();
  const config = {
    headers: {
      accessToken: getAccessToken(),
    },
  };
  axios
    .post(`${API_URL}api/v1/club/addPost`, formData, config)
    .then((res) => {
      const data = res.data.data;
      setResponse(data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("req cancel");
      } else {
        console.log("req performed");
      }
    });
};

export const getAllPosts = (setPosts, clubId) => {
  const controller = new AbortController();
  axios
    .get(`${API_URL}api/v1/club/post/${clubId}`, {
      signal: controller.signal,
    })
    .then((res) => {
      const data = res.data.data;
      setPosts(data);
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
