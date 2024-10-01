/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

const CommentList = ({ comments }) => {
  const renderComments = comments.map(({ status, content, id }) => {
    let renderContent;
    if (status === "approved") renderContent = content;
    if (status === "pending")
      renderContent = "This comment is awaiting moderation";
    if (status === "rejected") renderContent = "This comment has been rejected";

    return <li key={id}>{renderContent}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;
