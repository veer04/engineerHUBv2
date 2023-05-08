import React from "react";
import "./HackathonDesc.css";
import { Chip } from "@mui/material";
import { BsCalendar4 } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb";
import { Bucket_URL } from "../../../../services/APIUtils";

const HackathonDesc = ({ details }) => {
  const bucket = `${Bucket_URL}frontend/company/events/hackathon/`;
  return (
    <div className="HackDescription">
      <div className="HackDetailHeader">
        <div className="imageBanner">
          <img src={details.imgBanner} alt="Banner" />
        </div>
        <span>
          <span className="imgBox">
            <img src={details.logo} alt="Logo" />
          </span>
          <span className="heads">
            <h1>{details.name}</h1>
            <h3>{details.locations}</h3>
          </span>
          <div className="btn">Register Now</div>
        </span>
        <span className="Tags">
          {details.tags.map((tag, index) => (
            <Chip
              key={index}
              variant="outlined"
              size="small"
              label={tag}
              style={{
                fontWeight: "500",
                fontSize: "10px",
                marginRight: "15px",
              }}
            />
          ))}
        </span>
      </div>
      <div className="HackDesc">
        <h5>Brief</h5>
        <p>{details.brief}</p>
      </div>
      <div className="HackReq">
        <h5>Rules & Regulations</h5>
        <ul>
          {details.rules.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
      <div className="HackDetail">
        <h5>Brief</h5>
        <p>{details.details}</p>
      </div>
      <div className="HackDates">
        <h5>Dates & Deadlines</h5>
        <div className="HackDateTiles">
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Registration Date</h4>
              <h6>{details.dates.registration}</h6>
            </span>
          </div>
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Registration Fees Payment</h4>
              <h6>{details.dates.feeDate}</h6>
            </span>
          </div>
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Submission Date</h4>
              <h6>{details.dates.registration}</h6>
            </span>
          </div>
          <div className="HackDateItem">
            <div className="icon">
              <BsCalendar4 />
            </div>
            <span>
              <h4>Results</h4>
              <h6>{details.dates.registration}</h6>
            </span>
          </div>
        </div>
      </div>
      <div className="HackPrize">
        <h5>Prize Pool</h5>
        <div className="HackInfoItems">
          <div className="HackInfoItem" style={{ background: "#F7D77F" }}>
            <h6>First Prize</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <span>{`₹ ${details.prize.first}`}</span>
            <img src={`${bucket}prize.svg`} alt="guide" />
          </div>
          <div className="HackInfoItem" style={{ background: "#8FC8E8" }}>
            <h6>Second Prize</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <span>{`₹ ${details.prize.second}`}</span>
            <img src={`${bucket}prize.svg`} alt="guide" />
          </div>
          <div className="HackInfoItem" style={{ background: "#B2E887" }}>
            <h6>Certificate of Merit</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <img src={`${bucket}certificate.svg`} alt="guide" />
          </div>
          <div className="HackInfoItem" style={{ background: "#B2E887" }}>
            <h6>Certificate of Participation</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Scelerisque amet turpis
              senectus arcu rhoncus arcu.
            </p>
            <img src={`${bucket}certificate.svg`} alt="guide" />
          </div>
        </div>
      </div>
      <div className="HackContact">
        <h5>Contact</h5>
        <div className="HackContactTiles">
          {details.contact.users.map((user, index) => {
            return (
              <div className="HackContactItem">
                <div className="icon">
                  <TbPhoneCall />
                </div>
                <span>
                  <h4>{user.name}</h4>
                  <h6>{user.phone}</h6>
                </span>
              </div>
            );
          })}
          <div className="HackContactItem">
            <div className="icon">
              <FiMail />
            </div>
            <span>
              <h4>Ask your Queries at</h4>
              <h6>{details.contact.email}</h6>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDesc;
