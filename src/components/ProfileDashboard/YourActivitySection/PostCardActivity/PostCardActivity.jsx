import React from "react";
import "./postcardsaif.css";

const PostCardActivity = ({ data }) => {
  return (
    <div className="post-cards-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent:"center", alignItems:"center"}}>
    {data && data.length > 0 ? (
      data.map((post, index) => (
        <div
          key={post._id}
          style={{
            background: "#D9D9D9",
            borderRadius: "12px",
            width: "150px",
            height: "150px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden", // Prevents any content overflow
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100px", // Fixed height to ensure it doesn’t overflow
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden", // Ensures no overflow
            }}
          >
            <img
              src={post.postLogo}
              alt={`Post logo ${index}`}
              style={{
                maxWidth: "100%",
                // maxHeight: "100%",
                objectFit: "contain", // Ensures it fits within the box without cropping
                borderRadius: "8px",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "12px",
              textAlign: "center",
              color: "#002B36",
              marginTop: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%", // Ensures text remains inside the container
            }}
          >
            {post.description.length > 10
              ? `${post.description.substring(0, 10)}...`
              : post.description}
          </p>
        </div>
      ))
    ) : (
      <p>No posts available</p>
    )}
  </div>
  
  );
};

export default PostCardActivity;
