import React from 'react';
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { controller, getTrendingAlumni } from "../../services/APIConfig";
import "../../components/TrendingList/TrendingList.css"
import defaultPoster from "../../assets/defaultPoster";
import "../../pages/Campus/TrendingColleges.css"
const HomeClubCards = () => {
    const navigate=useNavigate();
    const data=[
        {
            "_id": "64ad8caa98017e0864ef351d",
            "collegeId": "64ad66cf98017e0864ef3254",
            "websiteUrl": "https://www.iitm.ac.in/",
            "name": "Shaastra",
            "userName": "sec_cocur",
            "role": "Club",
            "email": "sec_cocur@smail.iitm.ac.in",
            "clubPhoto": [
            "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/campus/Clubs/Photos/CLPHOTO0501.jpeg"
            ],
            "description": "SHAASTRA IS THE ANNUAL TECHNICAL FESTIVAL OF THE INDIAN INSTITUTE OF TECHNOLOGY MADRAS (ITM), CHENNAI, INDIA. THE SANSKRIT WORD 'SHAASTRA' MEANS SCIENCE AND THE FESTIVAL ACCORDINGLY CONSISTS OF VARIOUS ENGINEERING, SCIENCE, AND TECHNOLOGY COMPETITIONS, SUMMITS, LECTURES, VIDEO CONFERENCES, EXHIBITIONS, DEMONSTRATIONS AND WORKSHOPS. THE FESTIVAL IS TRADITIONALLY HELD OVER FOUR DAYS AND FOUR NIGHTS FROM 26TH TO 29TH JANUARY. IT HAS SO FAR SEEN TWENTY-ONE EDITIONS, HAVING STARTED IN ITS CURRENT AVATAR IN THE YEAR 2000. SHAASTRA IS ENTIRELY STUDENT-MANAGED AND IS THE FIRST SUCH EVENT IN THE WORLD TO BE ISO 9001:2015 CERTIFIED.",
            "events": 0,
            "image": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/campus/Clubs/Logos/CLLOGO0501.png",
            "clubType": "Technical",
            "members": [
            {
            "_id": "64b16c14069e7dc7a36588da",
            "clubId": "64ad8caa98017e0864ef351d",
            "name": "Baibhabi Patnaik",
            "designation": "Co-Curricular Affairs Secretary",
            "image": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/campus/Clubs/Members/CLMEM0501.jpeg",
            "linkedIn": "https://www.linkedin.com/in/baibhabi-patnaik-b1563419b/"
            },
            {
            "_id": "64b16c14069e7dc7a36588db",
            "clubId": "64ad8caa98017e0864ef351d",
            "name": "Mahesh R",
            "designation": "FInance",
            "image": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/campus/Clubs/Members/CLMEM0502.jpeg",
            "linkedIn": "https://www.linkedin.com/in/mahesh-r-21a4981a4/"
            }
            ],
            "verifiedByEhub": false,
            "isVerified": true,
            "createdAt": "2023-06-09T12:09:38.754Z",
            "trending": true,
            "views": 18,
            "followerCount": 0
            }


    ]

    const [trendingList, setTrendingList] = useState(data || []);

  return (
    <div>
          <div className="cards">
            {trendingList?.map((item) => (
              <div
                onClick={() => navigate(`/trending/campuses/${item._id}`)}
                key={item._id}
                className="card"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="poster">
                  {item?.clubPhoto?.length ? (
                    <img src={item?.clubPhoto[0]} alt="poster" />
                  ) : (
                    <img src={defaultPoster} alt="poster" />
                  )}
                </div>
                <div className="content">
                  <div className="logo">
                    <img src={item?.collegeLogo} alt="logo" />
                  </div>
                  <div className="details">
                    <span className="name text-crop-3">
                      {item?.collegeName}
                    </span>
                    <span className="location text-crop-2">{`${item?.city}, ${item?.state}`}</span>
                    <div className="tags">
                      {!!item?.totalClubs && (
                        <div className="club-count">
                          {item?.totalClubs}+ Clubs
                        </div>
                      )}
                      {!!item?.totalAlumni && (
                        <div className="alma-count">
                          {item?.totalAlumni}+ Members
                        </div>
                      )}
                      {!!item?.totalEvents && (
                        <div className="student-count">
                          {item?.totalEvents}+ Events
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
   
    </div>
  )
}

export default HomeClubCards