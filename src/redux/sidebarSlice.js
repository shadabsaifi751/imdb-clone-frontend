import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavSidebarOpen: false, // State for navigation sidebar 
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setNavSidebarOpen: (state, action) => {
      state.isNavSidebarOpen = action.payload;
    }
  },
});

export const { setNavSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;