import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { RWebShare } from "react-web-share";
import "./InternCard.css";
const InternCard = ({ company, position, link ,type,timing,location,description,time}) => {
  return (
    <div className="intrn">
    <div className="Intern-Container">
      <div className="d-flex justify-content-between">
      <hr
        style={{
            color: "#D9D9D9",
            // backgroundColor: "#D9D9D9",
            // height: "2.74px",
            width:"160.04px",
        }}
    />
    
      {/* <span className="posted">Posted {moment(time).fromNow()}</span> */}
      {/* <div className="d-flex align-content-end"> */}
          <RWebShare
        data={{
          url: `${link}`,
          title: "Share this"
        }}
        onClick={() => console.info("Shared successfully!")}
      >
            <ShareOutlinedIcon
              className="share-icon"
              style={{ fontSize: "22px", marginRight: "0px" }}
            />
            </RWebShare>
          </div>
      <div className="Intern-Company">
        {/* <svg href="google.svg"></svg> */}
        {/* <div className="company-image">
        <img src={google} alt="google logo"/>
        </div> */}
        <div className="Company-Name">{position}  | {company}</div>
          <button className="btn btn-primary newbtn">New</button>
          
      </div>
      <div>
      <li className="conta" >
            <ul className="items text-in">{timing}</ul>
            <ul className="text-in">{location}</ul>
            <ul className="text-in">{type}</ul>
          </li>
      </div>
      <div className="Intern-Position">
      
        {description}



      </div>
      {/* <div className="Intern-Apply-Link"> */}
   
      <div className="applycont">
      <a href={link} target="_blank" rel="noreferrer">
        <div className="btn btn-dark apply">
          Apply
        </div>
        </a>
      </div>
     
    </div>
    </div>
  );
};

export default InternCard;