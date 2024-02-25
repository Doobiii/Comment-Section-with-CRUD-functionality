// Comment.js
import React, { useState } from 'react';
import './Comment.css';
const Comment = ({ comment, onDelete, onReply, onDeleteReply }) => {
  const [newReply, setNewReply] = useState('');
  const [replySortOrder, setReplySortOrder] = useState('asc'); 
  const [replyLimitExceeded, setReplyLimitExceeded] = useState(false); 

  const handleReply = () => {
    if (newReply.trim() !== '') {
        if (comment.replies.length < 2) {
            onReply(comment.id, newReply);
            setNewReply('');
          } else{
            setReplyLimitExceeded(true); 
          }
    }
  };

  const handleDeleteReply = (replyId) => {
    onDeleteReply(comment.id, replyId);
  };

  const handleSortReplies = () => {
    const sortedReplies = [...comment.replies].sort((a, b) => {
      if (replySortOrder === 'asc') {
        return a.createdAt - b.createdAt;
      } else {
        return b.createdAt - a.createdAt;
      }
    });
    return sortedReplies;
  };



  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-text">{comment.text}</p>
       
      </div>
      <button className="delete-button" onClick={() => onDelete(comment.id)}>Delete</button>
      {/* <button className="reply-button" onClick={() => onReply(comment.id)}>Reply</button> */}
      <button className="reply-button" onClick={() => setReplySortOrder(replySortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort Replies {replySortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>
      <div className="reply-container">
        {handleSortReplies().map(reply => (
          <div key={reply.id} className="reply">
            <p className="reply-text">{reply.text}</p>
            <button className="delete-button" onClick={() => handleDeleteReply(reply.id)}>Delete Reply</button>
          </div>
        ))}
      </div>
      {!replyLimitExceeded && ( 
        <div className="reply-input">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write a reply..."
          />
          <button className="reply-button" onClick={handleReply}>Reply</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
