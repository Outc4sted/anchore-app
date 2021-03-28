import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userTableReducer from '../features/userTable/userTableSlice';
import userFormReducer from '../features/userForm/userFormSlice';

export default configureStore({
  reducer: {
    userTable: userTableReducer,
    userForm: userFormReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
