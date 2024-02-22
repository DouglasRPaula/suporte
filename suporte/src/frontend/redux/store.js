import { configureStore } from "@reduxjs/toolkit";
import chamadoSlice from "./cadastroSlice";

const store = configureStore({
  reducer: {
    chamado: chamadoSlice,
  },
});

export default store;
