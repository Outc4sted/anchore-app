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
    }
  },
  reducers: {
    saveUser: state => {
      console.log('saveUser - state.user', state.user)
    },
    closeModal: () => {
      console.log('closeModal')
    },
  },
});

export const { saveUser, closeModal } = userFormSlice.actions;


export default userFormSlice.reducer;
