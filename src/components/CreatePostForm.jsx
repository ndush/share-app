import React, { useState } from "react";

const CreatePostForm = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreatePost = () => {
    // Create the post and pass isPaid flag to determine if it's a paid post
    onCreatePost({ title, body, isPaid: false }); // Assuming it's not a paid post
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePostForm;
