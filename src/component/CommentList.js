// CommentList.js
import React from 'react';
import Comment from './Comment';
import './CommentList.css'; // Import CSS file for styling

const CommentList = ({ comments, onDelete, onReply, onDeleteReply }) => {

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onReply={onReply}
          onDeleteReply={onDeleteReply}
        />
      ))}
    </div>
  );
};

export default CommentList;
