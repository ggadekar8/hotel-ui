import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import waiterReducer from "./waiter/waiterSlice";
import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    waiter: waiterReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;