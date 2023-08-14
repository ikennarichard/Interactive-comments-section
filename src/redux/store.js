import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from '../redux/comment/commentsSlice';

const store = configureStore({
  reducer: {
    comment: commentsReducer,
  },
});

export default store;