import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const CreatePostCard = () => {
  return (
    <>
      <div
        style={{
          width: "224px",
          padding: "12px",
          borderRadius: "8px",
          background: "#f3f9f9",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "100px",
            background: "#128381",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <FaPlus cursor={"pointer"} size={32} color="white" />
          <h3
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "24px",
              color: "#7dc7c6",
              marginBottom: 0,
            }}
          >
            Create Post
          </h3>
        </div>

        <div style={{ marginTop: 8 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "24px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            Post
          </h3>

          <div
            style={{
              display: "flex",
              gap: 5,
            }}
          >
            <h3
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                color: "#33555E",
                marginBottom: 0,
              }}
            >
              Create Post
            </h3>
            <FaArrowRight size={14} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostCard;
