import { useState } from "react";
import { useDispatch } from "react-redux";
import { editReply } from "../redux/comment/commentsSlice";

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
      dispatch(editReply({
        commentId: commentId,
        replyId: replyId, 
        content: editedComment,
      }))

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
        <button 
        className="send"
        >UPDATE</button>
      </form>
    </div>
  )
}
