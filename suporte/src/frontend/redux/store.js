import { configureStore } from "@reduxjs/toolkit";
import chamadoSlice from "./chamadosSlice";
import authReducer from "./authSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chamado: chamadoSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
