import { createSlice } from '@reduxjs/toolkit';

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState: {
    users: [],
    isLoaded: false,
    error: null,
  },
  reducers: {
    editUser: () => {
      console.log('editUser')
    },
    deleteUser: () => {
      console.log('deleteUser')
    },
  },
});

export const { editUser, deleteUser } = userTableSlice.actions;


export default userTableSlice.reducer;
