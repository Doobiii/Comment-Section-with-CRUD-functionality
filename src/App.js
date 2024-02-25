import React, { useState, useEffect } from 'react';
import CommentList from './component/CommentList';
import './App.css';

const App = () => {
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem('comments');
    return storedComments ? JSON.parse(storedComments) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState(() => {
    const storedSortOrder = localStorage.getItem('sortOrder');
    return storedSortOrder ? storedSortOrder : 'asc';
  }); // State to track sorting order

  // Update local storage whenever comments change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // Update local storage whenever sort order changes
  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder]);

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments, { id: Date.now(), text: newComment, replies: [], createdAt: new Date() }];
      setComments(updatedComments);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleReplyComment = (commentId, replyText) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        if (comment.replies.length < 2) { // Limit the number of replies to 2
          return {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), text: replyText, createdAt: new Date() }]
          };
        }
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== replyId)
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleSortComments = () => {
    const sortedComments = [...comments].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.createdAt - b.createdAt;
      } else {
        return b.createdAt - a.createdAt;
      }
    });
    setComments(sortedComments);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="app-container">
      <h1>Comment Section</h1>
      <div className="sort-container">
        <button onClick={handleSortComments} className="sort-button">
          Sort Comments {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button onClick={handleAddComment} className="add-comment-button">Add Comment</button>
      </div>
      <CommentList
        comments={comments}
        onDelete={handleDeleteComment}
        onReply={handleReplyComment}
        onDeleteReply={handleDeleteReply}
      />
    </div>
  );
};

export default App;
