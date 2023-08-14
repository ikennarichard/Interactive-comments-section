import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addComment, 
  deleteComment,
  upVoteComment,
  deleteReply, 
  downVoteComment,
  upVoteReply,
  downVoteReply, 
} from './redux/comment/commentsSlice';
import Comment from './components/Comment.jsx';
import Replies from './components/Replies';
import UserComment from './components/UserComment';
import AddCommentForm from './components/AddCommentForm'

function App() {
  const comments = useSelector((state) => state.comment.comments);
  const currentUser = useSelector((state) => state.comment.currentUser);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  return (
    <>
      {comments.map((c) => (
        <div key={c.id}>
        {
        c.user.username == currentUser.username ?
        <UserComment
          key={c.id}
          content={c.content}
          commentId={c.id}
          createdAt={c.createdAt}
          score={c.score}
          user_image={c.user.image.png}
          username={c.user.username}
          handleUpvote={() => dispatch(upVoteComment(c.id))}
          handleDownvote={() => dispatch(downVoteComment(c.id))}
          handleDelete={() => dispatch(deleteComment(c.id))}
        />
        :
        <Comment
          key={c.id}
          content={c.content}
          commentId={c.id}
          createdAt={c.createdAt}
          username={c.user.username}
          user_image={c.user.image.webp}
          handleUpvote={() => dispatch(upVoteComment(c.id))}
          handleDownvote={() => dispatch(downVoteComment(c.id))}
          score={c.score}
          currentUser={currentUser.username}
        />
        
        }
        
          {c.replies && c.replies.map((r) => (
            (r.user.username != currentUser.username) ?

            <Replies
              key={r.id}
              content={r.content}
              commentId={c.id}
              replyId={r.id}
              createdAt={r.createdAt}
              score={r.score}
              replyingTo={r.replyingTo}
              sender_image={r.user.image.webp}
              sender={r.user.username}
              handleUpvote={() => dispatch(upVoteReply({commentId: c.id, replyId: r.id}))}
              handleDownvote={() => dispatch(downVoteReply({commentId: c.id, replyId: r.id}))}
              currentUser={currentUser.username}
            />
            :
            <div
            key={r.id} className="reply_wrapper">
              <UserComment
                content={r.content}
                commentId={c.id}
                replyId={r.id}
                createdAt={r.createdAt}
                score={r.score}
                replyingTo={r.replyingTo}
                user_image={r.user.image.webp}
                username={r.user.username}
                handleUpvote={() => dispatch(upVoteReply({commentId: c.id, replyId: r.id}))}
                handleDownvote={() => dispatch(downVoteReply({commentId: c.id, replyId: r.id}))}
                handleDelete={() => dispatch(deleteReply({
                  commentId:c.id,
                  replyId: r.id
                }))}
              />
            </div>
        ))}
        </div>
      ))}

      <AddCommentForm
        content={content}
        addComment={() => dispatch(addComment({content}))}
        handleSetContent = {setContent}
      />
    </>
  )
}

export default App