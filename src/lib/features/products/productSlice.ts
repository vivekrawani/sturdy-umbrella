import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "@/lib/types";
const initialState: {
  data: Product | null;
  loading: boolean;
  all: Product[];
} = {
  data: null,
  loading: false,
  all: [],
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

const fetchAllProducts = createAsyncThunk(
  "/api/products/all",
  async (_, _thunkAPI: any) => {
    try {
      const data = (await axios.get("/api/products")).data;
      return data!.res;
    } catch (error: any) {
      console.log("Errorsss");
      _thunkAPI.rejectWithValue(error);
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
      if (action.payload) {
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
    builder.addCase(fetchAllProducts.fulfilled, (state: any, action: any) => {
      state.loading = false;
      if (action.payload) {
        state.all = action.payload;
      }
      console.log(state.all);
    });
    builder.addCase(fetchAllProducts.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log(action.error.message);
    });
  },
});
export { getProduct, fetchAllProducts };
export default productSlice.reducer;
