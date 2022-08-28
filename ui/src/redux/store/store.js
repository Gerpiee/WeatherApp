import { configureStore } from "@reduxjs/toolkit";
import weather from "../slices/weatherSlices";
const store = configureStore({
  reducer: {
    weather: weather,
  },
});

export default store;
