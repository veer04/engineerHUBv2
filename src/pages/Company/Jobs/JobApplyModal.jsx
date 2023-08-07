import React from "react";
import "./JobApplyModal.css";
import { useNavigate } from "react-router-dom";
import { API_URL, Bucket_URL } from "../../../services/APIUtils";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { controller, getPostById } from "../../services/APIConfig";
import { useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import Cookies from "js-cookie";
import getCookie, { getAccessToken } from "../../../features/getCookieValues";
import { controller, patchProfilePicture, patchResume, getUserProfileById } from "../../../services/APIConfig";

export default function JobApplyModal({ change, jobApplied, resume }) {
    const { hiringId } = useParams();
    const userId = Cookies.get("_id");
    // const navigate = useNavigate();
    const [profileResume, setProfileResume] = useState(false);
    const [applyWithOldResume, setApplyWithOldResume] = useState(false);
    const [isResumeUpdating, setIsResumeUpdating] = useState(false);
    const [resumeRes, setResumeRes] = useState(null);
    const [updateResumeRes, setUpdateResumeRes] = useState();
    const [resumeErrors, setResumeErrors] = useState({
        resume: "",
    });
    //function to find out window current scroll position
    function getScrollPosition() {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return { top, left };
    }
    useEffect(() => {
        if (resume) {
            setProfileResume(true);
        }
    }, []);
    useEffect(() => {
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);
    const handleResume = async () => {
        setIsResumeUpdating(true);
        if (validateInputResume() === true) {
            const file = new FormData();
            file.append("resume", resumeRes);
            patchResume(userId, file, setUpdateResumeRes);
        } else if (isResumeUpdating === true) {
            window.location.reload();
        } else {
            setIsResumeUpdating(false);
        }
    };
    const applyWithOldResumeHandler = async () => {
        setApplyWithOldResume(true);
    };
    useEffect(() => {
        setIsResumeUpdating(false);
        var resumeUrl = applyWithOldResume ? resume : updateResumeRes?.data?.data;
        if (!applyWithOldResume && updateResumeRes && updateResumeRes?.status !== 200) {
            setResumeErrors({ resume: "There was an error applying to this job. Try Again!" });
            return;
        }
        if (updateResumeRes || (applyWithOldResume && resumeUrl != "")) {
            axios
                .post(
                    `${API_URL}api/v1/hiringRegistration`,
                    { resumeUrl, hiringId },
                    {
                        headers: {
                            accessToken: getAccessToken(),
                        },
                    }
                )
                .then((res) => {
                    if (res.status === 200 || res.status === 201 || res.status === 202 || res.status === 203 || res.status === 204) {
                        jobApplied(res.data.data);
                        change();
                    }
                })
                .catch((res) => {
                    if (res.status === 409) {
                        window.alert("already applied!");
                    }
                });
        } else if (updateResumeRes) {
            setResumeErrors({ resume: "There was an error applying to this job. Try Again!" });
        }
    }, [updateResumeRes, applyWithOldResume]);
    const validateInputResume = () => {
        let valid = true;
        const newErrors = {
            resume: "",
        };
        if (resumeRes === undefined || resumeRes === null || resumeRes === "") {
            if (profileResume === "" || profileResume === null) {
                newErrors.resume = "Resume is required";
                valid = false;
            }
        }
        setResumeErrors(newErrors);
        return valid;
    };
    return ReactDOM.createPortal(
        <div
            style={{
                top: getScrollPosition().top,
                left: getScrollPosition().left,
            }}
            id="job-apply-modal-container"
        >
            <>
                <div className="job-apply-container">
                    <div
                        onClick={() => {
                            change();
                        }}
                        className="position-absolute job-apply-cancel-button-container"
                    >
                        <MdOutlineCancel className="job-apply-cancel-button" />
                    </div>
                    <div className="job-modal-content">
                        {profileResume && (
                            <>
                                <div className="old-resume-modal-container">
                                    <div className="">
                                        <p className="upload-old-resume-lable">Apply with old resume</p>
                                    </div>
                                    <div className="old-resume-btns">
                                        <a href={resume} target="_blank">
                                            <button
                                                className="logBtn me-3 logout-btn"
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                Preview
                                            </button>
                                        </a>
                                        <button
                                            className="logBtn me-3 logout-btn"
                                            style={{
                                                textAlign: "center",
                                            }}
                                            onClick={() => applyWithOldResumeHandler()}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {profileResume && (
                            <>
                                <hr />
                            </>
                        )}
                        <div className="new-resume-upload-container">
                            <p className="text-danger mb-1">{resumeErrors.resume}</p>
                            <label className="upload-resume-lable" htmlFor="student-resume-image">
                                Apply with new resume here
                            </label>
                            <input type="file" name="newResume" id="student-resume-image" className="mb-4" onChange={(e) => setResumeRes(e.target.files[0])} />
                            <button
                                className="logBtn me-3 logout-btn"
                                style={{
                                    textAlign: "center",
                                }}
                                onClick={handleResume}
                            >
                                Upload
                            </button>
                            {isResumeUpdating && (
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        </div>,
        document.querySelector("#post-modal")
    );
}
