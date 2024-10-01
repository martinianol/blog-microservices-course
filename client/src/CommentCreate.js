import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, {
        content,
      });
      setContent("");
    } catch (error) {}
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>New Comment</label>
        <input
          value={content}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" style={{marginTop: "8px"}}>Submit</button>
    </form>
  );
};

export default CommentCreate;
