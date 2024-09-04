import React from "react";

const BannerCards = ({ img, text, title }) => {
  return (
    <>
      <div
        style={{
          width: "250px",
          height: "150px",
          borderRadius: "10px",
          padding: "16px",
          backgroundColor: "#E1F8FF",
        }}
      >
        <div
          style={{
            width: "218px",
            height: "118px",
            padding: "16px 0",
          }}
        >
          <div
            style={{
              display: "flex ",
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={img} alt="vector_img" />
            <h2
              style={{ fontSize: "30px", paddingTop: "4px", fontWeight: "700" }}
            >
              {title}
            </h2>
          </div>

          <div>
            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "400px",
                lineHeight: "19px",
                wordWrap: "break-word",
              }}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerCards;
