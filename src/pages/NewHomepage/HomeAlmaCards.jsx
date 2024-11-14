import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import {
  controller,
  getTrendingAlumni,
  getTrendingAlumni2,
} from "../../services/APIConfig";
import "../../components/TrendingList/TrendingList.css";
import defaultPoster from "../../assets/defaultPoster";
const HomeAlmaCards = ({ list }) => {
  const navigate = useNavigate();
  const [trendingList, setTrendingList] = useState([]);
  const [trendingList2, setTrendingList2] = useState([]);
  const [trendingList3, setTrendingList3] = useState([]);

  useEffect(() => {
    if (list?.length > 0) {
      setTrendingList([list[0]]);
      setTrendingList2([list[1]]);
      setTrendingList3([list[2]]);
    }
  }, [list]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {list?.slice(0, 3)?.map((trending, index) => (
        <div
          key={trending._id}
          onClick={() => navigate(`/profile/user/${trending._id}`)}
          className="row trending-cards-container"
          style={{ marginBottom: "15px", cursor: "pointer" }}
        >
          <Fragment>
            <div
              className="trending-card"
              style={{
                marginBottom: "10px",
                borderRadius: "10px",
                width: "400px",
                border: "none",
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
                  {!!trending?.experienceDetails?.length
                    ? `${trending?.experienceDetails[0]?.designation} | ${trending?.experienceDetails[0]?.organisationName}`
                    : ""}
                </span>
              </div>
            </div>
          </Fragment>
        </div>
      ))}
    </div>
  );

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <div
  //       className="row trending-cards-container"
  //       style={{ marginBottom: "20px", marginTop: "20px" }}
  //     >
  //       {trendingList?.map((trending, index) => (
  //         <Fragment key={trending._id} style={{ marginBottom: "30px" }}>
  //           <div
  //             onClick={() => navigate(`/profile/user/${trending._id}`)}
  //             className="trending-card"
  //             style={{
  //               marginBottom: "10px",
  //               borderRadius: "10px",
  //               width: "400px",
  //               border: "none",
  //             }}
  //           >
  //             <div className="logo">
  //               <img
  //                 onError={(e) => {
  //                   e.target.src = defaultPoster;
  //                 }}
  //                 src={trending.image}
  //                 alt="logo"
  //               />
  //             </div>
  //             <div className="content">
  //               <span className="name text-crop-2">
  //                 {trending?.name
  //                   ? trending?.name
  //                   : `${trending.firstName} ${trending.lastName}`}
  //               </span>
  //               <span className="subheading text-crop-2">
  //                 {!!trending?.experienceDetails?.length
  //                   ? `${trending?.experienceDetails[0]?.designation} | ${trending?.experienceDetails[0]?.organisationName}`
  //                   : ""}
  //               </span>
  //             </div>
  //           </div>
  //         </Fragment>
  //       ))}
  //     </div>
  //     <div
  //       className="row trending-cards-container"
  //       style={{ marginBottom: "20px" }}
  //     >
  //       {trendingList2?.map((trending, index) => (
  //         <Fragment key={trending._id} style={{ marginBottom: "30px" }}>
  //           <div
  //             onClick={() => navigate(`/profile/user/${trending._id}`)}
  //             className="trending-card"
  //             style={{
  //               marginBottom: "10px",
  //               borderRadius: "10px",
  //               width: "300px",
  //               border: "none",
  //             }}
  //           >
  //             <div className="logo">
  //               <img
  //                 onError={(e) => {
  //                   e.target.src = defaultPoster;
  //                 }}
  //                 src={trending.image}
  //                 alt="logo"
  //               />
  //             </div>
  //             <div className="content">
  //               <span className="name text-crop-2">
  //                 {trending?.name
  //                   ? trending?.name
  //                   : `${trending.firstName} ${trending.lastName}`}
  //               </span>
  //               <span className="subheading text-crop-2">
  //                 {!!trending?.experienceDetails?.length
  //                   ? `${trending?.experienceDetails[0]?.designation} | ${trending?.experienceDetails[0]?.organisationName}`
  //                   : ""}
  //               </span>
  //             </div>
  //           </div>
  //         </Fragment>
  //       ))}
  //     </div>
  //     <div className="row trending-cards-container">
  //       {trendingList3?.map((trending, index) => (
  //         <Fragment key={trending._id} style={{ marginBottom: "30px" }}>
  //           <div
  //             onClick={() => navigate(`/profile/user/${trending._id}`)}
  //             className="trending-card"
  //             style={{
  //               marginBottom: "10px",
  //               borderRadius: "10px",
  //               width: "300px",
  //               border: "none",
  //             }}
  //           >
  //             <div className="logo">
  //               <img
  //                 onError={(e) => {
  //                   e.target.src = defaultPoster;
  //                 }}
  //                 src={trending.image}
  //                 alt="logo"
  //               />
  //             </div>
  //             <div className="content">
  //               <span className="name text-crop-2">
  //                 {trending?.name
  //                   ? trending?.name
  //                   : `${trending.firstName} ${trending.lastName}`}
  //               </span>
  //               <span className="subheading text-crop-2">
  //                 {!!trending?.experienceDetails?.length
  //                   ? `${trending?.experienceDetails[0]?.designation} | ${trending?.experienceDetails[0]?.organisationName}`
  //                   : ""}
  //               </span>
  //             </div>
  //           </div>
  //         </Fragment>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default HomeAlmaCards;
