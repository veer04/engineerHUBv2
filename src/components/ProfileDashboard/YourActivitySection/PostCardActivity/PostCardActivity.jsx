import React from "react";
import "./postcardsaif.css";

const PostCardActivity = ({ data }) => {
  const uniquePosts = data?.filter(
    (post, index, self) => index === self.findIndex((p) => p._id === post._id)
  );

  return (
    <div className="post-cards-container">
      {uniquePosts?.length > 0 ? (
        uniquePosts.map((post, index) => (
          <div className="post-card" key={post._id}>
            <div className="post-card-image-container">
              <img src={post.postLogo} alt={`Post logo ${index}`} />
            </div>
            <p className="post-card-description">
              {post.description.length > 30
                ? `${post.description.substring(0, 30)}...`
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
