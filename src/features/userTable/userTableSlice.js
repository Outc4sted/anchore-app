import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { anchoreUserApi } from '../../app/constants';

export const getAllUsers = createAsyncThunk(
  `users`,
  async () => await fetch(`${anchoreUserApi}/users`)
    .then(res => res.json()),
);

export const deleteUserById = createAsyncThunk(
  `users/:userId`,
  async ({ userId }) => await fetch(`${anchoreUserApi}/users/${userId}`, {
    method: 'DELETE',
  })
  .then(res => res.json()),
);

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState: {
    users: [],
    isLoaded: false,
    error: null,
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = Array.isArray(action.payload) ? action.payload : [];
      state.isLoaded = true;
    },
    [getAllUsers.rejected]: state => {
      state.isLoaded = true;
    },
  }
});

export default userTableSlice.reducer;
