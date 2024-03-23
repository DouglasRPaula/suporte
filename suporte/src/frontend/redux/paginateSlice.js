import { createSlice } from "@reduxjs/toolkit";

const paginateSlice = createSlice({
  name: "paginate",
  initialState: {
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages } = paginateSlice.actions;

export default paginateSlice.reducer;
