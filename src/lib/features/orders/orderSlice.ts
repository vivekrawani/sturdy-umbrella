import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product, OrderDetails } from "@/lib/types";
type Order = OrderDetails | null;

interface InitialState {
  data: Order[];
  single: {
    products: Product[];
    orderDetails: Order;
  };
  loading: boolean;
  pastOrders : Order [];
}

const initialState: InitialState = {
  data: [],
  single: {
    products: [],
    orderDetails: null,
  },
  loading: false,
  pastOrders : [],
};

const getOrders = createAsyncThunk("/api/orders", async (_, _thunkAPI: any) => {
  try {
    const data = (await axios.get(`/api/orders`)).data;
    return data;
  } catch (error: any) {
    console.log("Errorsss", error);
    _thunkAPI.rejectWithValue(error);
  }
});

const getPastOrders = createAsyncThunk("/api/orders/past", async (_, _thunkAPI: any) => {
  try {
    const data = (await axios.get(`/api/orders/past`)).data;
    return data;
  } catch (error: any) {
    console.log("Errorsss", error);
    _thunkAPI.rejectWithValue(error);
  }
});

const getOrder = createAsyncThunk(
  "/api/orders/id",
  async (orderId: string, _thunkAPI: any) => {
    try {
      const data = (await axios.get(`/api/orders/${orderId}`)).data;
      return data;
    } catch (error: any) {
      console.log("Errorsss");
      _thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
      state.loading = false;
      if (action.payload) state.data = action.payload;
    });
    builder.addCase(getOrders.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getOrders.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log("messge", action.error.message);
    });
    builder.addCase(getOrder.fulfilled, (state: any, action: any) => {
      state.loading = false;
      if (action.payload) state.single = action.payload;
    
    });
    builder.addCase(getOrder.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getOrder.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log("messge", action.error.message);
    });
    builder.addCase(getPastOrders.fulfilled, (state: any, action: any) => {
      state.loading = false;
      if (action.payload) state.pastOrders = action.payload;
      
    });
    builder.addCase(getPastOrders.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getPastOrders.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log("messge", action.error.message);
    });
  },
});
export { getOrders, getOrder, getPastOrders, };
export type {Order};
export default orderSlice.reducer;
