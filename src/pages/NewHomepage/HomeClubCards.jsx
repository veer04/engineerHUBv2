import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../components/TrendingList/TrendingList.css";
import defaultPoster from "../../assets/defaultPoster";
import "../../pages/Campus/TrendingColleges.css";

const HomeClubCards = ({ clubs }) => {
  const navigate = useNavigate();

  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    setTrendingList(clubs);
  }, [clubs]);

  return (
    <div>
      <div
        style={{
          maxHeight: "242px",
          maxWidth: "332px",
        }}
        className="cards"
      >
        {trendingList?.slice(0, 1).map((item) => (
          <div
            onClick={() => navigate(`/profile/club/${item._id}`)}
            key={item._id}
            className="card"
            style={{
              cursor: "pointer",
              padding: "1rem",
            }}
          >
            <div
              style={{
                height: "150px",
                width: "100%",
                borderRadius: "5px",
                overflow: "hidden",
              }}
              className="poster"
            >
              {item?.clubPhoto?.length ? (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={item?.clubPhoto[0]}
                  alt="poster"
                />
              ) : (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={defaultPoster}
                  alt="poster"
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                marginTop: "12px",
              }}
              className="content"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                className="logo"
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={item?.image}
                  alt="logo"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "10px",
                }}
                className="details"
              >
                <span className="name text-crop-3">{item?.name}</span>
                <span className="location text-crop-2">{`${item?.collegeId?.collegeName}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeClubCards;
