import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://posts.com/posts/create", { title });
      setTitle("");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input value={title} onChange={handleChange} className="form-control" />
      </div>
      <button className="btn btn-primary" style={{marginTop: "8px"}}>Submit</button>
    </form>
  );
};

export default PostCreate;
