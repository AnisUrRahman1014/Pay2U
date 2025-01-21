import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "reduxjs-toolkit-persist";

const initialState = {
  user: null,
  isFirstTime: true,
};

const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    clearPersistSlice() {
      return initialState;
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    logoutUser(state, action) {
      return initialState;
    },

    setIsFirstTime(state, action) {
      state.isFirstTime = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      AsyncStorage.removeItem("persist:root");
    });
  },
});

export const { clearPersistSlice, setUser, logoutUser, setIsFirstTime } =
  persistSlice.actions;

export default persistSlice.reducer;
