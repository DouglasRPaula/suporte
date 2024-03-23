import { configureStore } from "@reduxjs/toolkit";
import chamadoSlice from "./chamadosSlice";
import paginateSlice from "./paginateSlice";

const store = configureStore({
  reducer: {
    chamado: chamadoSlice,
    paginate: paginateSlice,
  },
});

export default store;
