import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CSVState {
    data: any[];
  }

  const initialState: CSVState = {
    data: [],
  };

  const storesCSV = createSlice({
    name: "storesCsv",
    initialState,
    reducers: {
      setCSVStoreData: (state, action: PayloadAction<any[]>) => {
        state.data = action.payload;
      },
    },
  });
  
  export const { setCSVStoreData } = storesCSV.actions;
  export default storesCSV.reducer;