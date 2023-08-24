
export default function AddCommentForm({
  addComment,
  handleSetContent,
  content,
}) {

  function handleSubmit(e) {
    e.preventDefault()
    if (content === '') return;
    addComment()
    handleSetContent('')
  }
  return (
    <div>

      <form 
      onSubmit={handleSubmit} 
      className="comment_box" >
        <textarea 
        type="text" 
        placeholder='Add a comment...' 
        value={content}
        onChange={(e) => handleSetContent(e.target.value)}></textarea>
        <div className="form_img_btn">
          <img src="/assets/images/avatars/image-juliusomo.webp" alt="user_image" className="user_image"/>
          <button
          type='submit'
          className="send add_comment"
          >SEND</button>
        </div>
      </form>
    </div>
  )
}
