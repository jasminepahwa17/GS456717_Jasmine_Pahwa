import { configureStore } from "@reduxjs/toolkit";
import stores from './slices/storesCSV';
import skuCSV from "./slices/skuCSV"
import calenderCSV from "./slices/calenderCSV"
import planningCSV from "./slices/planningCSV"


export const store = configureStore({
    reducer: {
        stores,
        skuCSV,
        calenderCSV,
        planningCSV
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;