import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

const gLogin = createAsyncThunk("posts/fetch", async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    return data;
  });

// const gLogin = createAsyncThunk("/user/login", async () => {
// //   try {
// //     const user = await googleSignIn();
// //     return user;
// //   } catch (error) {
// //     throw new Error(error);
// //   }
// });

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
