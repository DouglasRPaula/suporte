import { configureStore } from "@reduxjs/toolkit";
import chamadoSlice from "./chamadosSlice";

const store = configureStore({
  reducer: {
    chamado: chamadoSlice,
  },
});

export default store;
