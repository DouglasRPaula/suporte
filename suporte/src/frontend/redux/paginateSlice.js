import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
};

const paginateSlice = createSlice({
    name: "paginate",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        }
    }
})

export const { setCurrentPage } = paginateSlice.actions;

export default paginateSlice.reducer;