import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReply } from "../redux/comment/commentsSlice";

export default function Replies({
  content,
  currentUser,
  commentId,
  replyId, 
  handleUpvote, 
  handleDownvote,
  sender, 
  sender_image,
  createdAt,
  score,
  
}) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyInput, setReplyInput] = useState('@'+sender+',')
  const dispatch = useDispatch()

  function handleReplySubmit(e) {
    e.preventDefault()
    
    const updatedReply = replyInput.replace(/@(\w+),/g, '');

    dispatch(addReply({ 
      commentId: commentId,
      replyId: replyId,
      replyingTo: sender, 
      content: updatedReply, 
      createdAt: 'Just now',
    }));
    setShowReplyInput(false);
    setReplyInput('@'+sender+',');
  }


  return (
    <div className='reply_wrapper'>
      <article className="replies comment_grid">
        <div className="header header_section">
          <img 
          src={sender_image} 
          alt={'headshot of ' + sender}
          className="user_image" 
          />
          <h2>{sender}</h2>
          <span className="comment_date">{createdAt}</span>
        </div> 

        <p className="content">{content}</p>

        <div className="votes score_controls">
            <button 
              type="button" 
              className="upvote" 
              onClick={handleUpvote}>
                +
            </button>

            <button 
            type="button" 
            className="scores vote_count">{score}
            </button>
            
            <button 
              type="button" 
              className="downvote"
              onClick={handleDownvote}>
                -
            </button>
          </div>
          
        <div className="vr_ interactions">      
          <button
          className="reply"
            onClick={() => setShowReplyInput((prev) => !prev)}>
            <img className="reply" src="/assets/images/icon-reply.svg"/>
            Reply
          </button>
        </div>
    </article>
    
    {
    /* form for adding new replies */
    showReplyInput && 
    <div className={`${showReplyInput ?'drop' : ''} comments_text_area`}>
        
    <div className="reply_box reply_form_container">
      <img
      className="user_image" 
      src="/assets/images/avatars/image-juliusomo.webp"
      alt={'headshot of '+currentUser} />

      <form onSubmit={handleReplySubmit}>
        <textarea
          type="text"
          className="reply_input"
          value={replyInput}
          onChange={(e) => setReplyInput(e.target.value)}
        ></textarea>
        <button 
        type="submit"
        className="send reply_btn_"
        >REPLY</button>
      </form>
    </div>
  </div>
    }
    </div>
  )
}