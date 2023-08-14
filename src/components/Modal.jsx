export default function Modal({
  onCancel,
  onDelete
}) {
  return (
    <div className="modal_wrapper">
      <article className="modal">
        <h3>Delete comment</h3>
        <p className="content">Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone</p>
        <div className="modal_buttons">
          <button
          className="modal_cancel"
          type="button"
          onClick={onCancel}>
            NO, CANCEL
          </button>
          
          <button
            className="modal_delete"
            type="button"
            onClick={onDelete}
          >
            YES, DELETE
          </button>
        </div>
      </article>
  </div>
  )
}
