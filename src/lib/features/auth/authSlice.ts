import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { googleAuth } from "@/db/firebaseAuth";
const initialState = {
  user: null,
  loading: false,
};



const gLogin = createAsyncThunk("/user/login", async (_, thunkAPI) => {
  try {
    const user = await googleAuth();
    return user;
  } catch (error : any) {
    console.log("Errorsss");
    
    thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder :any) => {
    builder.addCase(gLogin.fulfilled, (state:any, action:any) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(gLogin.pending, (state:any) => {
      state.loading = true;
    });
    builder.addCase(gLogin.rejected, (state : any, action :any) => {
      state.loading = false;
      console.log(action.error.message);
    });
  },
});
export { gLogin };
export default authSlice.reducer;
