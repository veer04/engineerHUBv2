import React from "react";
import "./postcardsaif.css";

const PostCardActivity = ({ data }) => {
  console.log(data, "postdata");
  const uniquePosts = data?.filter(
    (post, index, self) => index === self.findIndex((p) => p._id === post._id)
  );

  return (
    <div className="post-cards-container">
      {uniquePosts?.length > 0 ? (
        uniquePosts.map((post, index) => (
          <div className="post-card" key={post._id}>
            {post.postLogo ? (
              <>
                <div className="post-card-image-container">
                  <img src={post.postLogo} alt={`Post logo ${index}`} />
                </div>
                <p className="post-card-description">
                  {post.description.length > 30
                    ? `${post.description.substring(0, 30)}...`
                    : post.description}
                </p>
              </>
            ) : (
              <div className="caption-only-post-card">
                <p
                  className="post-card-description"
                  style={{
                    padding: "1rem",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "0.95rem",
                    margin: 0,
                  }}
                >
                  {post.description.length > 100
                    ? `${post.description.substring(0, 100)}...`
                    : post.description}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostCardActivity;
