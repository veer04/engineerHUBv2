import "./Hosting.css";
import Celeb from  "./Images/celebrate.png";
import Computer from "./Images/computer.png";
import Mark from "./Images/mark.png";
import Tutor from "./Images/tutor.png";
import Punch from "./Images/punch.png";
import Jobs from "./Images/jobs.png";
import Syntax from "./Images/syntax.png";
import { useNavigate } from "react-router-dom";
const Hosting = () => {
    const navigate =useNavigate();
  return (
    <>
    <div className="heading">
    <p className="headingHosting"> Host an Oppurtunity</p>
    </div>
    <div className="headingSubtext">
    <p className="hostingDetails"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, odio quis quidem, esse ex porro sint expedita, quia rem perferendis minima voluptatum cumque iure fugit saepe nostrum praesentium quaerat magni.</p>
    </div>
    
    <div className="container hostingContainerCards" >

        <div className="cardHeaderText">
            <p className="TextCard"> <span className="changeColor"></span></p>
        </div>
        <div className="row containingCards">
            <div className="col-lg-3 cardHosting">
            <div className="topHeading">
                Cultural Event
            </div>
            <div className=" row secondLine">
                Create event ➡️
            </div>
            <div className="lastICon">
                <img src={Celeb} alt="" height={100} width={120} />
            </div>
            </div>
             <div className="col-lg-3 cardHosting">
             <div className="topHeading">
                Technical Event
            </div>
            <div className=" row secondLine" onClick={navigate("/")}>
                Create event ➡️
            </div>
            <div className="lastICon">
                <img src={Computer} alt="" height={100} width={120} />
            </div>
            </div>
            <div className="col-lg-3 cardHosting">
            <div className="topHeading">
                Hackathon
            </div>
            <div className=" row secondLine">
                Create event ➡️
            </div>
            <div className="lastICon">
                <img src={Mark} alt="" height={100} width={120} />
            </div>
            </div>
            <div className="col-lg-3 cardHosting">
            <div className="topHeading">
                Webinar
            </div>
            <div className=" row secondLine">
                Create event ➡️
            </div>
            <div className="lastICon">
                <img src={Tutor} alt="" height={100} width={120} />
            </div>
            </div>

        </div>
    </div>


    <div className="container hostingContainerCards" >

<div className="cardHeaderText">
    <p className="TextCard"> <span className="changeColor"></span></p>
</div>
<div className="row containingCards">
    <div className="col-lg-4 cardHosting">
    <div className="topHeading">
        Jobs
    </div>
    <div className=" row secondLine">
        Create jobs ➡️
    </div>
    <div className="lastICon">
        <img src={Jobs} alt="" height={100} width={120} />
    </div>
    </div>
     <div className="col-lg-4 cardHosting">
     <div className="topHeading">
        Internships
    </div>
    <div className=" row secondLine">
        Create jobs ➡️
    </div>
    <div className="lastICon">
        <img src={Syntax} alt="" height={100} width={120} />
    </div>
    </div>
    <div className="col-lg-4 cardHosting">
    <div className="topHeading">
        Challenges
    </div>
    <div className=" row secondLine">
        Create jobs ➡️
    </div>
    <div className="lastICon">
        <img src={Punch} alt="" height={100} width={120} />
    </div>
    </div>

</div>
</div>
    </>
  )
}

export default Hosting