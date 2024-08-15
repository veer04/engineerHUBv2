import React from "react";

const FeedBackCarousalForBookNow = ({ name, profile, content }) => {
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f7f9f9",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "63px",
          height: "32px",
          padding: "4px 14px",
          gap: 3,
          borderRadius: 10,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h5 style={{ fontSize: "13px", marginTop: "10px" }}>5</h5>
        <img src={"/star.svg"} alt="" width={16} height={16} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <h2
          style={{
            color: "black",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "400",
            lineHeight: "19px",
            wordWrap: "break-word",
          }}
        >
          {content}
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src="/g.png" alt="" />
        <div style={{ marginLeft: "5px" }}>
          <h2
            style={{
              fontSize: "12.43px",
              lineHeight: "21px",
              marginTop: "4px",
              fontWeight: "600",
            }}
          >
            {name}
          </h2>
          <h2
            style={{
              fontSize: "12.43px",
              marginTop: "-8px",
              fontWeight: "400",
            }}
          >
            {profile}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FeedBackCarousalForBookNow;
