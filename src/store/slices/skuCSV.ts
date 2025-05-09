import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CSVState {
    data: any[];
  }

  const initialState: CSVState = {
    data: [],
  };

  const skuCSV = createSlice({
    name: "skuCSV",
    initialState,
    reducers: {
      setCSVSKUData: (state, action: PayloadAction<any[]>) => {
        state.data = action.payload;
      },
    },
  });
  
  export const { setCSVSKUData } = skuCSV.actions;
  export default skuCSV.reducer;