import { useState } from "react";
import { useDispatch } from "react-redux";
import { editReply, editComment } from "../redux/comment/commentsSlice";

export default function EditComment({
   comment,
   commentId,
   replyId,
   toggleCanEdit,
  }) {
    
    const [editedComment, setEditedComment] = useState(comment);
    const dispatch = useDispatch();

    function handleSubmit(e) {
      e.preventDefault();

      if (replyId !== undefined) {
        dispatch(editReply({
          commentId: commentId,
          replyId: replyId, 
          content: editedComment,
        }))
      } else {
        dispatch(editComment({
          commentId: commentId,
          content: editedComment,
        }))
      }


      toggleCanEdit()
    }

    function cancel() {
      toggleCanEdit()
    }
  return (
    <div className="edit_container">
      <form 
      onSubmit={(e) => handleSubmit(e)}
      className="reply_form_container"
      >
        <textarea 
        type="text" 
        className="edit_comment"
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)} 
        ></textarea>
        <div className="cancel_reply">
          <button
          className="update"
          >UPDATE</button>
          <button
            className="cancel_with_reply"
            type="button"
            onClick={cancel}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}
