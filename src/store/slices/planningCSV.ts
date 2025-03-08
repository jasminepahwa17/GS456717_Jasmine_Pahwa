import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CSVState {
    data: any[];
  }

  const initialState: CSVState = {
    data: [],
  };

  const planningCSV = createSlice({
    name: "planningCSV",
    initialState,
    reducers: {
        setCSVPlanningData: (state, action: PayloadAction<any[]>) => {
        state.data = action.payload;
      },
    },
  });
  
  export const { setCSVPlanningData } = planningCSV.actions;
  export default planningCSV.reducer;