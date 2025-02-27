import React, { useState } from "react";
import "./newcompanypostcard.css";
import { Bucket_URL, FRONTEND_URL } from "../../../../services/APIUtils";
import { useNavigate, useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

const NewCompanyPostCard = ({ _id, postLogo, likes }) => {
  const navigate = useNavigate();
  const { collegeId, clubId } = useParams();
  const [isLiked, setIsLiked] = useState(
    sessionStorage.getItem(`${_id} isLiked`) !== null
      ? JSON.parse(sessionStorage.getItem(`${_id} isLiked`))
      : false
  );
  return (
    <div
      className="main-post-card-company"
      onClick={() => navigate(`posts/${_id}`)}
    >
      <div className="image-div">
        <img
          src={
            postLogo ||
            `${Bucket_URL}newcompanydashboard/companypostcardframe.png`
          }
          alt=""
        />
      </div>

      <div className="heart-and-share">
        <div
          onClick={() => {
            const currentStatus = isLiked;
            setIsLiked(!currentStatus);
            sessionStorage.setItem(
              `${_id} isLiked`,
              JSON.stringify(!currentStatus)
            );
          }}
          style={{
            backgroundColor: isLiked ? "#fec2cb" : "",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="24"
            viewBox="0 0 26 24"
            fill="none"
          >
            <path
              d="M23.1494 2.94496C22.5629 2.32835 21.8667 1.83921 21.1003 1.50549C20.334 1.17177 19.5126 1 18.6831 1C17.8535 1 17.0321 1.17177 16.2658 1.50549C15.4994 1.83921 14.8032 2.32835 14.2167 2.94496L12.9997 4.22404L11.7826 2.94496C10.5981 1.70004 8.99152 1.00065 7.31633 1.00065C5.64114 1.00065 4.03455 1.70004 2.85001 2.94496C1.66547 4.18988 1 5.87836 1 7.63895C1 9.39954 1.66547 11.088 2.85001 12.3329L4.06705 13.612L12.9997 23L21.9323 13.612L23.1494 12.3329C23.7361 11.7166 24.2015 10.9849 24.519 10.1794C24.8366 9.37403 25 8.51076 25 7.63895C25 6.76714 24.8366 5.90387 24.519 5.09846C24.2015 4.29305 23.7361 3.56128 23.1494 2.94496Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div style={{ cursor: "pointer" }}>
          <RWebShare
            data={{
              text: `Check out this post`,
              url: `${FRONTEND_URL}campus/${collegeId}/technical-clubs/${clubId}/posts/${_id}`,
              title: "Check out this post at engineerHUB",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.59375 13.5098L15.4237 17.4898"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.4137 6.50977L8.59375 10.4898"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RWebShare>
        </div>
      </div>
    </div>
  );
};

export default NewCompanyPostCard;
