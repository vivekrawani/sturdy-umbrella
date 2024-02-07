import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Product = {
    imageUrl: string;
    name: string;
    price: number;
    count?: number;
    discountedPrice : number
  };

type Order = {
    address?: string;
    pincode?: string;
    isAccepted: boolean;
    isDelivered: boolean;
    amount: string;
    mobileNumber: string;
    userName: string;
    payment: boolean;
    products: Product[];
    orderId:string;
  } | null

  interface InitialState {
    data : Order[],
    loading : boolean,
  }






const initialState  : InitialState = {
  data: [],
  loading: false,
};

const getOrders = createAsyncThunk("/api/orders", async (_, _thunkAPI:any) => {
  try {
    const data = await (await fetch(`/api/orders`)).json();
    return data;
  } catch (error: any) {
    console.log("Errorsss");
    _thunkAPI.rejectWithValue(error);
  }
});

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getOrders.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getOrders.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log(action.error.message);
    });
  },
});
export { getOrders };
export default orderSlice.reducer;
