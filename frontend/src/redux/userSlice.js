import { createSlice } from "@reduxjs/toolkit";
/**
 * todoSlice
 *
 * A Redux slice for managing the state of user.
 *
 * Reducers:
 * - `setAuthUserSlice`: Sets the user details.
 * - `resetUserSlice`: Resets the user details to its initial state.
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    authStatus: false,
    authUser: null,
  },
  reducers: {
    setAuthUserSlice: (state, action) => {
      state.authUser = action.payload;
      state.authStatus = true;
    },
    resetUserSlice: (state) => {
      state.authStatus = false;
      state.authUser = null;
    },
  },
});
export const { setAuthUserSlice, resetUserSlice } = userSlice.actions;
export default userSlice.reducer;
