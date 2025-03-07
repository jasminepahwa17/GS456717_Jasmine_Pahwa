import { configureStore } from "@reduxjs/toolkit";
import stores from './slices/storesCSV';
import skuCSV from "./slices/skuCSV"


export const store = configureStore({
    reducer: {
        stores,
        skuCSV
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;