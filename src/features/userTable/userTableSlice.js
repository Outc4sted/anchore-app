import { createSlice } from '@reduxjs/toolkit';

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState: {
    users: [],
    isLoaded: false,
    error: null,
  },
  reducers: {
    editUser: (userId) => {
      console.log('editUser id', userId);
    },
    deleteUser: (userId) => {
      console.log('deleteUser id', userId);
    },
  },
});

export const { addUser, editUser, deleteUser } = userTableSlice.actions;

export default userTableSlice.reducer;
