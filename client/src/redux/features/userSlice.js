import { createSlice } from "@reduxjs/toolkit";

// create a slice for user data with createSlice from Redux Toolkit
export const userSlice = createSlice({
  name: "User", // give the slice a name for debugging purposes
  initialState: {
    user: null, // initially, the user is null
    listFavorites: [], // initially, the list of favorites is empty
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        // if the payload is null, remove the token from local storage
        localStorage.removeItem("actkn");
      } else {
        // otherwise, if the payload has a token, save it in local storage
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }

      // set the user property to the value of the payload
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      // set the listFavorites property to the value of the payload
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      // remove the favorite with the specified mediaId from the listFavorites
      state.listFavorites = [...state.listFavorites].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      // add the favorite from the payload to the listFavorites
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } =
  userSlice.actions;

export default userSlice.reducer;
