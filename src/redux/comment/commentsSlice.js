import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

const initialState = {

  currentUser: {
    "image": { 
      "png": "/assets/images/avatars/image-juliusomo.png",
      "webp": "/assets/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  },

  comments: [
    {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": {
        "image": { 
          "png": "assets/images/avatars/image-amyrobson.png",
          "webp": "assets/images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
      "replies": []
    },
    {
      "id": 2,
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": "2 weeks ago",
      "score": 5,
      "user": {
        "image": { 
          "png": "/assets/images/avatars/image-maxblagun.png",
          "webp": "/assets/images/avatars/image-maxblagun.webp"
        },
        "username": "maxblagun"
      },
      "replies": [
        {
          "id": 3,
          "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          "createdAt": "1 week ago",
          "score": 4,
          "replyingTo": "maxblagun",
          "user": {
            "image": { 
              "png": "/assets/images/avatars/image-ramsesmiron.png",
              "webp": "/assets/images/avatars/image-ramsesmiron.webp"
            },
            "username": "ramsesmiron",
          }
        },
        {
          "id": 4,
          "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          "createdAt": "2 days ago",
          "score": 2,
          "replyingTo": "ramsesmiron",
          "user": {
            "image": { 
              "png": "/assets/images/avatars/image-juliusomo.png",
              "webp": "/assets/images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
          }
        }
      ]
    }
  ]
}

function getTimeAgo(timestamp) {
  const currentTime = new Date();
  const targetTime = new Date(timestamp);
  const timeDiff = currentTime - targetTime;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? '1 hr ago' : `${hours} hrs ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
  } else {
    return seconds <= 10 ? 'just now' : `${seconds} secs ago`;
  }
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

    addComment: (state, action) => {
      const {content} = action.payload
      const newComment = {
        id: uuidV4(),
        content,
        createdAt: getTimeAgo(new Date()),
        score: 0,
        user: state.currentUser,
        replies: [],
      }

      state.comments.push(newComment);
    },

    editComment: (state, action) => {
      const { commentId, content } = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        comment.content = content;
      }
    },

    deleteComment: (state, action) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload)
    },

    addReply: (state, action) => {
      const { commentId, content, createdAt, replyingTo} = action.payload
      const comment = state.comments.find((comment) => comment.id == commentId)
      if (comment) {
        const newReply = {
          id: uuidV4(),
          content,
          createdAt,
          score: 0,
          user: state.currentUser,
        };

        if (replyingTo) {
          newReply.replyingTo = replyingTo;
        }
        comment.replies.push(newReply)
      }
    },

    editReply: (state, action) => {
      const { commentId, replyId, content } = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply) {
          reply.content = content;
        }
      }
    },

    deleteReply: (state, action) => {
      const { commentId, replyId } = action.payload;

      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        const replyIndex = comment.replies.findIndex((reply) => reply.id === replyId);
        if (replyIndex !== -1) {
          comment.replies.splice(replyIndex, 1);
        }
      }
    },

    // score controllers
    upVoteComment: (state, action) => {
      const comment = state.comments.find((comment) => comment.id === action.payload)
      if (comment) {
        comment.score++;
      }
    },
    
    downVoteComment: (state, action) => {
      const comment = state.comments.find((comment) => comment.id === action.payload)
      if (comment && comment.score != 0) {
        comment.score--;
      }
    },

    upVoteReply: (state, action) => {
      const {commentId, replyId} = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);

      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply) {
          reply.score++
        }
      }
    },
    
    downVoteReply: (state, action) => {
      const {commentId, replyId} = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);

      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply && reply.score != 0) {
          reply.score--
        }
      }
    },
  }
});

export const {
  addComment,
  editComment,
  deleteComment,
  addReply,
  editReply,
  deleteReply,
  upVoteComment,
  downVoteComment,
  upVoteReply,
  downVoteReply,
  
} = commentsSlice.actions;

export default commentsSlice.reducer;