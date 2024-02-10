import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
};

const getProduct = createAsyncThunk(
  "/api/products",
  async (id: string, thunkAPI: any) => {
    try {
      const data = await (await fetch(`/api/products/${id}`)).json();
      return data;
    } catch (error: any) {
      console.log("Errorsss");
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getProduct.fulfilled, (state: any, action: any) => {
      state.loading = false;
      if ( action.payload) {
        state.data = action.payload;
      }
      console.log(state.data);
    });
    builder.addCase(getProduct.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getProduct.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log(action.error.message);
    });
  },
});
export { getProduct };
export default productSlice.reducer;
