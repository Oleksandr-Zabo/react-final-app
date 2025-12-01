import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Comments.scss';
import defaultAvatar from '../../assets/img/avatars/avatar.jpg';

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Sofia',
      avatar: defaultAvatar,
      time: '12 min ago',
      text: 'I really love this recipe. I will definitely try to make it at home. Thanks for sharing!',
      likes: 12,
      replies: 2
    },
  ]);

  const [commentText, setCommentText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setCurrentUser(JSON.parse(savedProfile));
    }
  }, []);

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    if (!currentUser) {
        alert("Please login to post a comment");
        return;
    }

    const newComment = {
      id: comments.length + 1,
      user: currentUser.username || currentUser.fullName || 'Anonymous',
      avatar: currentUser.avatar || defaultAvatar,
      time: 'Just now',
      text: commentText,
      likes: 0,
      replies: 0
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  return (
    <div className="comments-section">
      <h2>Comments <span className="count">({comments.length})</span></h2>

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
            <div className="comment-body">
              <div className="comment-header">
                <span className="comment-user">{comment.user}</span>
                <span className="comment-time">{comment.time}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
              <div className="comment-actions">
                <button>Reply ({comment.replies})</button>
                <button>Like ({comment.likes})</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="write-comment">
        <h3>Write a comment</h3>
        {!currentUser && (
            <span className="login-prompt"><Link to="/profile">Login</Link> to post a comment</span>
        )}
        <div className="comment-form">
          <textarea 
            placeholder={currentUser ? "Write your comment here..." : "Please login to write a comment"}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={!currentUser}
          ></textarea>
          <div className="form-actions">
            <button 
                className="post-btn" 
                onClick={handlePostComment}
                disabled={!currentUser || !commentText.trim()}
                style={{ opacity: (!currentUser || !commentText.trim()) ? 0.6 : 1, cursor: (!currentUser || !commentText.trim()) ? 'not-allowed' : 'pointer' }}
            >
                Post comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
