import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type Notifications = {
  author: string;
  time: Date;
  body: string;
  title: string;
};
export type { Notifications };

const initialState: {
  notifications: Notifications[];
} = {
  notifications: [],
};

const getNotifications = createAsyncThunk(
  "/api/notifications",
  async (arg: { id: string; collection: string }, _thunkAPI: any) => {
    try {
      const data = (await axios.get(`/api/notifications`)).data;
      return data;
    } catch (error: any) {
      console.log("Errorsss");
      _thunkAPI.rejectWithValue(error);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getNotifications.fulfilled, (state: any, action: any) => {
      state.loading = false;
      if (action.payload) {
        console.log(action.payload);
        state.notifications = action.payload;
      }
    });
    builder.addCase(getNotifications.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getNotifications.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log(action.error.message);
    });
  },
});
export { getNotifications };
export default notificationSlice.reducer;
