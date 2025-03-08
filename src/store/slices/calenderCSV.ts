import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CSVState {
    data: any[];
  }

  const initialState: CSVState = {
    data: [],
  };

  const calenderCSV = createSlice({
    name: "calenderCSV",
    initialState,
    reducers: {
      setCSVCalenderData: (state, action: PayloadAction<any[]>) => {
        state.data = action.payload;
      },
    },
  });
  
  export const { setCSVCalenderData } = calenderCSV.actions;
  export default calenderCSV.reducer;