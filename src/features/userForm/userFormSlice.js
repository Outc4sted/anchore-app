import { createSlice } from '@reduxjs/toolkit';

export const userFormSlice = createSlice({
  name: 'userForm',
  initialState: {
    user: {
      firstName: null,
      lastName: null,
      dob: null,
      phone: null,
      address: null,
      notes: null,
    },
    openEditUser: false,
  },
  reducers: {
    toggleUserForm: (state, data) => {
      state.openEditUser = !state.openEditUser;
      state.user = data?.payload || {};
    },
    saveUser: async (state, {payload: { user }}) => {
      console.log('saveUser - user', user)

      const response = await fetch("https://my-json-server.typicode.com/Outc4sted/anchore-app/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(
          result => {
            console.log('result', result)
          },
          error => {
            console.log('error', error)
          }
        );
      return response.json()
    },
  },
});

export const { toggleUserForm, saveUser } = userFormSlice.actions;


export const selectOpenEditUser = ({ userForm }) => userForm.openEditUser;


export default userFormSlice.reducer;
