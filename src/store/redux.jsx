import { configureStore } from "@reduxjs/toolkit";
import userReducerFun from "./user-slice.jsx";

const store = configureStore({
  reducer: {
    user: userReducerFun,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
