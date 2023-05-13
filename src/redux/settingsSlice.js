import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    allowLikes: true,
    allowDislikes: true,
  },
  reducers: {
    toggleAllowLikes: (state) => {
      state.allowLikes = !state.allowLikes;
    },
    toggleAloowDislikes: (state) => {
      state.allowDislikes = !state.allowDislikes;
    },
  },
});

export const { toggleAllowLikes, toggleAloowDislikes } = settingsSlice.actions;
export default settingsSlice.reducer;
