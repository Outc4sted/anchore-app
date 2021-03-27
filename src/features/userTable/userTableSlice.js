import { createSlice } from '@reduxjs/toolkit';

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState: {
    users: [],
    loading: false,
    editing: false,
  },
  reducers: {
    loadUsers: state => {
      console.log('loadUsers')
    },
    editUser: () => {
      console.log('editUser')
    },
  },
});

export const { loadUsers, editUser } = userTableSlice.actions;


export default userTableSlice.reducer;
