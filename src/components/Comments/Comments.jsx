import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Comments.scss';
import userIcon from '../../assets/img/icons/user.svg';
import heartIcon from '../../assets/img/icons/heart.svg';
import heartFillIcon from '../../assets/img/icons/heart fill.svg';
import replyIcon from '../../assets/img/icons/message-circle.svg'; // Using message-circle as reply icon
import { AuthModal } from '../Modal';

const CommentItem = ({ comment, currentUser, onLoginReq }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(comment.likes);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState(comment.repliesList || []); // Assuming comment object might have repliesList later

    const handleLike = () => {
        if (!currentUser) {
            onLoginReq();
            return;
        }
        if (liked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    const handleReplyClick = () => {
        if (!currentUser) {
            onLoginReq();
            return;
        }
        setIsReplying(!isReplying);
    };

    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        
        const newReply = {
            id: Date.now(),
            user: currentUser?.username || currentUser?.fullName || 'Guest',
            avatar: currentUser?.avatar || userIcon,
            time: 'Just now',
            text: replyText
        };

        setReplies([...replies, newReply]);
        setReplyText('');
        setIsReplying(false);
    };

    return (
        <div className="comment-item">
            <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
            <div className="comment-body">
                <div className="comment-header">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-time">{comment.time}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
                
                <div className="comment-actions">
                    <button className={`action-btn reply-btn ${isReplying ? 'active' : ''}`} onClick={handleReplyClick}>
                        <img src={replyIcon} alt="Reply" />
                        Reply ({replies.length + (comment.replies || 0)})
                    </button>
                    <button className={`action-btn like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
                        <img src={liked ? heartFillIcon : heartIcon} alt="Like" />
                        Like ({likesCount})
                    </button>
                </div>

                {isReplying && (
                    <div className="reply-form">
                        <textarea 
                            placeholder="Write a reply..." 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button className="submit-reply-btn" onClick={handleReplySubmit}>Post Reply</button>
                    </div>
                )}

                {replies.length > 0 && (
                    <div className="replies-list">
                        {replies.map(reply => (
                            <div key={reply.id} className="reply-item">
                                <img src={reply.avatar} alt={reply.user} className="reply-avatar" />
                                <div className="reply-body">
                                    <div className="reply-header">
                                        <span className="reply-user">{reply.user}</span>
                                        <span className="reply-time">{reply.time}</span>
                                    </div>
                                    <p className="reply-text">{reply.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Sofia',
      avatar: userIcon,
      time: '12 min ago',
      text: 'I really love this recipe. I will definitely try to make it at home. Thanks for sharing!',
      likes: 12,
      replies: 2,
      repliesList: [] // Initial empty list for new replies
    },
  ]);

  const [commentText, setCommentText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setCurrentUser(JSON.parse(savedProfile));
      } else {
        setCurrentUser(null);
      }
    };

    loadProfile();
    window.addEventListener('userProfileUpdate', loadProfile);
    return () => window.removeEventListener('userProfileUpdate', loadProfile);
  }, []);

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    if (!currentUser) {
        setIsAuthModalOpen(true);
        return;
    }

    const newComment = {
      id: comments.length + 1,
      user: currentUser.username || currentUser.fullName || 'Anonymous',
      avatar: currentUser.avatar || userIcon,
      time: 'Just now',
      text: commentText,
      likes: 0,
      replies: 0,
      repliesList: []
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleLoginClick = (e) => {
      e.preventDefault();
      setIsAuthModalOpen(true);
  };

  return (
    <div className="comments-section">
      <h2>Comments <span className="count">({comments.length})</span></h2>

      <div className="comments-list">
        {comments.map(comment => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            currentUser={currentUser} 
            onLoginReq={() => setIsAuthModalOpen(true)}
          />
        ))}
      </div>

      <div className="write-comment">
        <h3>Write a comment</h3>
        {!currentUser && (
            <span className="login-prompt">
                <a href="/" onClick={handleLoginClick}>Login</a> to post a comment
            </span>
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
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Comments;
