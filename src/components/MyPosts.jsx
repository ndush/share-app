import React from "react";

const MyPosts = ({ currentUser, userPosts, onCreatePost }) => {
  const handleCreatePost = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      id: userPosts.length + 1,
      userId: currentUser.id,
      title: formData.get("title"),
      body: formData.get("body"),
    };
    onCreatePost(newPost);
    event.target.reset();
  };

  return (
    <div>
      <h2>My Posts</h2>
      <form onSubmit={handleCreatePost}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea id="body" name="body" required />
        </div>
        <button type="submit">Create Post</button>
      </form>

      {userPosts && userPosts.length > 0 ? (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default MyPosts;
