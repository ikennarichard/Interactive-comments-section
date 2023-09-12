import Modal from "./Modal";
import { useState } from "react";
import EditComment from "./EditComment";

export default function UserComment({
  user_image,
  username,
  replyingTo,
  createdAt,
  content,
  handleDownvote,
  handleUpvote,
  handleDelete,
  score,
  commentId,
  replyId,
}) {

  const [modalView, setModalView] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  function toggleModal() {
    setModalView((state) => !state);
  }

  function deleteComment() {
    handleDelete()
    toggleModal()
  }

  function toggleEdit() {
    setCanEdit(state => !state)
  }
  return (
    <>
    {
      canEdit ?
      <article>
        <div className="edit_form_container">

            <div className="user_section">
              <img
              className="user_image"
              src={user_image}
              alt={'headshot of ' + username}
              />
              <h2>{username}</h2>
              <span className="you">you</span>
              <span className="comment_date edit_comment_date">{createdAt}</span>
            </div>

          <div className="vr_buttons">
              <button
              className="delete"
              onClick={toggleModal}><img src="/assets/images/icon-delete.svg" alt=""/>Delete</button>
              <button
              className="edit"
              type="button"
              onClick={toggleEdit}
              ><img src="/assets/images/icon-edit.svg" alt=""/>Edit</button>
          </div>
       
        
          <EditComment
            comment ={content}
            commentId={commentId}
            replyId={replyId}
            toggleCanEdit={toggleEdit}
          />
        
        <div className="score_controls edit_score_controls votes">
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

        </div>
      </article> 
      :
    <article className="comment_grid">
      <div className="user_header header_section">
        <img 
        className="user_image"
        src={user_image} 
        alt={'headshot of ' + username} 
        />
        <h2>{username}</h2>
        <span className="you">you</span>
        <span className="comment_date">{createdAt}</span>
      </div>

      <p className="content"><span className="friend_name">{replyingTo && `@${replyingTo}`}</span> {content}</p>

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
          <div className="vr_buttons">
            <button
            className="delete"
            onClick={toggleModal}><img src="/assets/images/icon-delete.svg" alt=""/>Delete
            </button>
            <button
            className="edit"
            type="button"
            onClick={toggleEdit}
            ><img src="/assets/images/icon-edit.svg" alt=""/>Edit
            </button>
          </div>
      </div>
    </article>

    }
      {
      modalView && 
        <Modal
          onDelete={deleteComment}
          onCancel={toggleModal}
        />
      }
    </>
  )
}
