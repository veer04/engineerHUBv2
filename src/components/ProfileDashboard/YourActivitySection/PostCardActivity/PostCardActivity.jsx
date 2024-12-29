import React from "react";

const PostCardActivity = ({ data }) => {
  return (
    <div className="post-cards-container">
      {data && data.length > 0 ? (
        data.map((post, index) => (
          <div
            key={post._id}
            style={{
              background: "#D9D9D9",
              borderRadius: "12px",
              width: 150,
              height: 150,
              margin: "10px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={post.postLogo}
              alt={`Post logo ${index}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#002B36",
                marginTop: "5px",
              }}
            >
              {post.description.length > 0
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
