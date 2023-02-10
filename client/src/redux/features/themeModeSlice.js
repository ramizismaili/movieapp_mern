import { createSlice } from "@reduxjs/toolkit";

//  a slice for managing the theme mode of the application
export const themeModeSlice = createSlice({
  name: "ThemeMode", 
  initialState: {
    themeMode: "dark", // Initial state, with theme mode set to dark
  },
  reducers: {
    setThemeMode: (state, action) => {
      // Reducer for setting the theme mode
      state.themeMode = action.payload; // Updates the theme mode in the state
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
