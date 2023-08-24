import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../redux/comment/commentsSlice";

export default function Comment({
  content, 
  handleUpvote, 
  handleDownvote, 
  username,
  createdAt,
  score,
  user_image,
  commentId,
}) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyInput, setReplyInput] = useState('@'+username+',')
  const currentUser = useSelector((state) => state.comment.currentUser);
  const dispatch = useDispatch()

  function handleReplySubmit(e) {
    e.preventDefault()

    // avoid multiple mentions
    const updatedReply = replyInput.replace(/@(\w+),/g, '');

    dispatch(addReply({ commentId: commentId, content: updatedReply, createdAt: 'Just now', replyingTo: username}));
    setShowReplyInput(false);
    setReplyInput('@'+username+',');
  }

  function cancel () {
    setShowReplyInput(false);
  }
  return (
    <>
    <article className="comment_grid">
      
      <div className="comment_header">
        <div className="header header_section">
          <img
          className='user_image' 
          src={user_image} 
          alt={'headshot of ' + username} 
          />
          <h2>{username}</h2>
          <b className="comment_date">{createdAt}</b>
        </div>
      </div>

      <p className="content">{content}</p>

      <div className="score_controls votes">
          <button 
            type="button" 
            className="upvote" 
            onClick={handleUpvote}>
              +
          </button>

          <button type="button" className="scores vote_count">{score}</button>
          
          <button 
            type="button" 
            className="downvote"
            onClick={handleDownvote}>
              -
          </button>
        </div>

      <div className="vr_ interactions">
        {/* score controls */}
        <button
        className="reply" 
        type="button"
        onClick={() => setShowReplyInput((prev) => !prev)}
        ><img src="/assets/images/icon-reply.svg"/>Reply</button>
      </div>
    </article>

    {showReplyInput && 
      <div className={`${showReplyInput ?'drop' : ''} comments_text_area`}>
        
        <div className="comment_box reply_form_container">
          <img
          className="user_image" 
          src={currentUser.image.webp} 
          alt={'headshot of '+currentUser} />

          <form onSubmit={handleReplySubmit}>
            <textarea
              type="text"
              className="reply_input"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
            ></textarea>
            <div className="cancel_reply">
              <button
              type="submit"
              className="send reply_btn_"
              >REPLY</button>
              <button
              className="cancel_with_reply"
              type="button"
              onClick={cancel}>
              CANCEL
              </button>
            </div>
          </form>
        </div>

      </div>
      }
      </>
  )
}
