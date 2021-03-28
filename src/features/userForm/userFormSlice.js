import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { anchoreUserApi } from '../../app/constants';

const initialState = {
  user: {
    firstName: null,
    lastName: null,
    dob: null,
    phone: null,
    address: null,
    notes: null,
  },
  openEditUser: false,
};

export const createUser = createAsyncThunk(
  `users`,
  async ({ user }) => await fetch(`${anchoreUserApi}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  .then(res => res.json()),
);

export const updateUser = createAsyncThunk(
  `PUT-users/:userId`,
  async ({ user }) => await fetch(`${anchoreUserApi}/users/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  .then(res => res.json()),
);

export const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    toggleUserForm: (state, { payload }) => {
      state.openEditUser = payload.forceToggle !== undefined ? payload.forceToggle : !state.openEditUser;
      state.user = payload || initialState.user;
    },
  },
  extraReducers: {
    [createUser.fulfilled]: state => {
      state.openEditUser = false;
    },
    [updateUser.fulfilled]: state => {
      state.openEditUser = false;
    },
  }
});

export const { toggleUserForm } = userFormSlice.actions;


export default userFormSlice.reducer;
