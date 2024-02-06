import React from 'react';
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { controller, getTrendingAlumni } from "../../services/APIConfig";
import "../../components/TrendingList/TrendingList.css"
import defaultPoster from "../../assets/defaultPoster";
const HomeAlmaCards = () => {
    const navigate=useNavigate();
    const data=[{
        "_id": "647f89a9a3d09ca2044ccb69",
        "image": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/alumni/647f89a9a3d09ca2044ccb691695577931662.jpg",
        "experienceDetails": [
        {
        "_id": "65113871da6782e2014b4809",
        "designation": "Frontend Developer",
        "organisationName": "engineerHUB"
        }
        ],
        "firstName": "Swapnil",
        "lastName": "Raj",
        "views": 453
        },
    ]
    const data2=[{
        "_id": "647f89a9a3d09ca2044ccb69",
        "image": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/alumni/647f89a9a3d09ca2044ccb691695577931662.jpg",
        "experienceDetails": [
        {
        "_id": "65113871da6782e2014b4809",
        "designation": "Frontend Developer",
        "organisationName": "engineerHUB"
        }
        ],
        "firstName": "Swapnil",
        "lastName": "Raj",
        "views": 453
        },]
    const data3=[
        {
            "_id": "647f89a9a3d09ca2044ccb69",
            "image": "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/alumni/647f89a9a3d09ca2044ccb691695577931662.jpg",
            "experienceDetails": [
            {
            "_id": "65113871da6782e2014b4809",
            "designation": "Frontend Developer",
            "organisationName": "engineerHUB"
            }
            ],
            "firstName": "Swapnil",
            "lastName": "Raj",
            "views": 453
            },
    ]
    const [trendingList, setTrendingList] = useState(data || []);
    const [trendingList2, setTrendingList2] = useState(data2 || []);
    const [trendingList3, setTrendingList3] = useState(data3 || []);

  return (

    <div  >  
    <div className="row trending-cards-container" style={{marginBottom:"20px",marginTop:"20px"}}>
        {trendingList
        ?.map((trending, index) => (
        <Fragment key={trending._id}  style={{marginBottom:"30px"}}>
            <div
              onClick={() => navigate(`/profile/user/${trending._id}`)}
              className="trending-card"
              style={{
                marginBottom:"10px",
                borderRadius:"10px",
                width:"400px",
                border:"none",
              }}
            >
              <div className="logo">
                <img
                  onError={(e) => {
                    e.target.src = defaultPoster;
                  }}
                  src={trending.image}
                  alt="logo"
                />
              </div>
              <div className="content">
                <span className="name text-crop-2">
                  {trending?.name
                    ? trending?.name
                    : `${trending.firstName} ${trending.lastName}`}
                </span>
                <span className="subheading text-crop-2">
                  {trending?.experience &&
                    (!!Object.keys(trending?.experience).length
                      ? `${trending?.experience?.designation} | ${trending?.experience?.organisationName}`
                      : "")}
                </span>
              </div>
            </div>
          
          </Fragment>
           ))}
           </div>
           <div className="row trending-cards-container" style={{marginBottom:"20px"}}>
            {trendingList2
        ?.map((trending, index) => (
        <Fragment key={trending._id}  style={{marginBottom:"30px"}}>
            <div
              onClick={() => navigate(`/profile/user/${trending._id}`)}
              className="trending-card"
              style={{
                marginBottom:"10px",
                borderRadius:"10px",
                width:"300px",
                border:"none",
              }}
            >
              <div className="logo">
                <img
                  onError={(e) => {
                    e.target.src = defaultPoster;
                  }}
                  src={trending.image}
                  alt="logo"
                />
              </div>
              <div className="content">
                <span className="name text-crop-2">
                  {trending?.name
                    ? trending?.name
                    : `${trending.firstName} ${trending.lastName}`}
                </span>
                <span className="subheading text-crop-2">
                  {trending?.experience &&
                    (!!Object.keys(trending?.experience).length
                      ? `${trending?.experience?.designation} | ${trending?.experience?.organisationName}`
                      : "")}
                </span>
              </div>
            </div>
          
          </Fragment>
           ))}
           </div>
           <div className="row trending-cards-container">
            {trendingList3
        ?.map((trending, index) => (
        <Fragment key={trending._id}  style={{marginBottom:"30px"}}>
            <div
              onClick={() => navigate(`/profile/user/${trending._id}`)}
              className="trending-card"
              style={{
                marginBottom:"10px",
                borderRadius:"10px",
                width:"300px",
                border:"none",
              }}
            >
              <div className="logo">
                <img
                  onError={(e) => {
                    e.target.src = defaultPoster;
                  }}
                  src={trending.image}
                  alt="logo"
                />
              </div>
              <div className="content">
                <span className="name text-crop-2">
                  {trending?.name
                    ? trending?.name
                    : `${trending.firstName} ${trending.lastName}`}
                </span>
                <span className="subheading text-crop-2">
                  {trending?.experience &&
                    (!!Object.keys(trending?.experience).length
                      ? `${trending?.experience?.designation} | ${trending?.experience?.organisationName}`
                      : "")}
                </span>
              </div>
            </div>
          
          </Fragment>
           ))}
           </div>
  
    </div>
  )
}

export default HomeAlmaCards