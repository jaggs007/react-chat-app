import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: ''
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    }
  }
});

export const { setCurrentUser } = userSlice.actions;
export const selectCurrentUser = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName
})

export default userSlice.reducer;