import "./Mentorship.css";
import Mentor from "./mentor.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../services/APIUtils";

const Mentorship = () => {
  const [mentor, setMentor] = useState(null);
  const navigate = useNavigate();

  const getChat = () => {
    navigate("/mentorChat");
  };
  useEffect(() => {
    axios.get(`${API_URL}api/v1/mentor`).then((response) => {
      setMentor(response.data);
      console.log(object);
    });
  }, []);

  return (
    <>
      <div className="headingClass">
        <p className="headingtxtmentorship">1 to 1 Mentorship Program </p>
      </div>
      <div className="row mentorDetails">
        <div className="col-lg-4 leftSideMentor">
          <p className="MajorText">Connect with the Right Mentors</p>
          <div className="textAboutMentorship">
            Lorem ipsum dolor sit amet consectetur. Vitae diam facilisi libero
            mauris mauris quam elit. Convallis nunc accumsan sit cum. Vitae diam
            eu enim dignissim donec ultrices dis amet ipsum.
          </div>
          <div className="row exploreBtnContainer">
            <div className=" btnExplore">Eplore More</div>
          </div>
        </div>

        <div className="col-lg-5 rightSideMentor"></div>
      </div>
      <div className="row">
        <p className="mentorHeading">Our Mentors</p>
        <div className="row mentorCard ">
          <div className="col-lg-3" onClick={getChat}>
            <img src={mentor.image} alt="" />
          </div>
          <div className="col-lg-3" onClick={getChat}>
            <img src={Mentor} alt="" />
          </div>
          <div className="col-lg-3" onClick={getChat}>
            <img src={Mentor} alt="" />
          </div>
        </div>
        <div className="row mentorCard ">
          <div className="col-lg-3" onClick={getChat}>
            <img src={Mentor} alt="" />
          </div>
          <div className="col-lg-3" onClick={getChat}>
            <img src={Mentor} alt="" />
          </div>
          <div className="col-lg-3" onClick={getChat}>
            <img src={Mentor} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentorship;
