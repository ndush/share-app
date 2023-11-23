import React, { useState } from "react";

const CreatePostForm = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreatePost = () => {
    onCreatePost({ title, body, isPaid: false });
    setTitle("");
    setBody("");
  };

  return (
    <div className="create-post-form-container">
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
