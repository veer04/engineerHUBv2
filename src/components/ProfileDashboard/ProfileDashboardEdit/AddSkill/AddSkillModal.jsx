import React, { useEffect, useState } from "react";
import "./addskillmodal.css";
import { IoMdClose } from "react-icons/io";
import { validSkills } from "./techskill";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "../../../../features/getCookieValues";

const AddSkillModal = ({ isOpen, onClose, setProfileData, profileData }) => {
  const [formData, setFormData] = useState({
    skill: "",
  });
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSkillsAdded, setIsSkillsAdded] = useState(false);

  const handleClose = () => {
    setErrors({});
    setFormData({
      skill: "",
    });
    setSkills([]);
    onClose();
  };

  useEffect(() => {
    if (profileData && isOpen) {
      setSkills(profileData?.skillsDetails?.map((skill) => skill?.skills));
      setIsSkillsAdded(profileData?.skillsDetails?.length > 0);
      setFormData({ skill: "" });
    } else {
      setSkills([]);
      setIsSkillsAdded(false);
      setFormData({ skill: "" });
    }
  }, [profileData, isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors.skill) {
      setErrors({});
    }
  };

  const handleAddSkill = () => {
    const skill = formData.skill.trim();
    if (/[^a-zA-Z0-9\s]/.test(skill)) {
      setErrors({
        skill:
          "Please enter only one skill at a time without any symbols or commas.",
      });
      return;
    }

    if (skill) {
      const lowerCaseSkill = skill.toLowerCase();
      const validSkillsLowerCase = validSkills.map((s) => s.toLowerCase());
      if (lowerCaseSkill) {
        setSkills([...skills, skill]);
        setFormData({ skill: "" });
        setErrors({});
      } else {
        setErrors({
          skill:
            "This skill is not allowed. Please select a valid Tech or UI/UX skill.",
        });
      }
    } else {
      setErrors({ skill: "Please enter a valid skill." });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);

    const updatedSkillsInProfile = profileData.skillsDetails.map(
      (skillDetail) => {
        const skillArray = skillDetail.skills.split(",");
        const updatedSkillArray = skillArray.filter(
          (skill11) => skill11 !== skillToRemove
        );
        skillDetail.skills = updatedSkillArray.join(",");
        return skillDetail;
      }
    );

    setProfileData((prevData) => ({
      ...prevData,
      skillsDetails: updatedSkillsInProfile,
    }));
  };

  const handleSaveSkill = async () => {
    const config = {
      headers: {
        accessToken: getAccessToken(),
      },
    };
    setLoading(true);

    try {
      if (isSkillsAdded) {
        const skillString = skills.join(",");
        const skillId = profileData.skillsDetails[0]._id;
        const payload = { skills: skillString };

        const response = await axios.patch(
          `${API_URL}api/v1/update/skills/${skillId}`,
          payload,
          config
        );

        if (response.data) {
          toast("🥳 Skills updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });

          const updatedSkills = [...profileData.skillsDetails];
          updatedSkills[0].skills = skillString;

          setProfileData((prevData) => ({
            ...prevData,
            skillsDetails: updatedSkills,
          }));
          setIsSkillsAdded(true);
          onClose();
        } else {
          toast.error("🚨 Something went wrong. Please try again!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      } else {
        const skillString = skills.join(",");
        const payload = { skills: skillString };

        const response = await axios.post(
          `${API_URL}api/v1/add/skills`,
          payload,
          config
        );

        if (response.data) {
          toast("🥳 You have added the skills!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });

          const updatedSkills = [
            ...profileData.skillsDetails,
            { skills: skillString },
          ];

          setProfileData((prevData) => ({
            ...prevData,
            skillsDetails: updatedSkills,
          }));
          setIsSkillsAdded(true);
        } else {
          toast.error("🚨 Something went wrong. Please try again!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      console.error("Error saving skills", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="skill-modal-overlay">
        <div className="skill-modal">
          <div className="modal-header">
            <button className="close-btn" onClick={handleClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="modal-content">
            <h3 className="modal-title"> Add Skill</h3>
            <p className="modal-subtitle"> Add Skill</p>

            <div className="form-div-modal">
              <div className="skill-div-inner-div">
                <div className="mb-4">
                  <label
                    htmlFor="skillHeading"
                    className="label-css-skill block text-sm font-medium"
                  >
                    Add Skills
                  </label>
                  <span className="required-indicator">*</span>

                  <div className="skill-input-div-main-main">
                    <div className="skill-input-div-main">
                      <input
                        type="text"
                        name="skill"
                        className="input-css-title-skill"
                        placeholder="Type Skill Name"
                        value={formData.skill}
                        onChange={handleInputChange}
                      />

                      <button
                        className="skill-add-btn"
                        onClick={handleAddSkill}
                      >
                        Add
                      </button>
                    </div>

                    <div>
                      {errors.skill && (
                        <p className="error-p">{errors.skill}</p>
                      )}
                    </div>
                  </div>

                  <div className="below-div-with-skill-name">
                    {skills &&
                      skills.length > 0 &&
                      skills.map((skill, index) => {
                        const skillList = skill.split(",");
                        return skillList.map((singleSkill, skillIndex) =>
                          singleSkill && singleSkill !== "" ? ( // Only render if skill is not empty
                            <div
                              key={`${index}-${skillIndex}`}
                              className="skill-name-div"
                            >
                              <h3 className="skill-name-h3">{singleSkill}</h3>
                              <svg
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemoveSkill(singleSkill)} // Pass the index for removal
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M12.6668 3.33301L3.3335 12.6663"
                                  stroke="#002B36"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.3335 3.33301L12.6668 12.6663"
                                  stroke="#002B36"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          ) : null
                        );
                      })}
                  </div>
                </div>

                <div className="modal-button-div">
                  <button className="cancel-modal-btn" onClick={handleClose}>
                    Cancel
                  </button>
                  <button className="save-modal-btn" onClick={handleSaveSkill}>
                    {loading
                      ? "Updating..."
                      : isSkillsAdded
                      ? "Update"
                      : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSkillModal;
