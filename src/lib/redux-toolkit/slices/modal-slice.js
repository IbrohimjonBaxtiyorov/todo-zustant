import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addModal: false,
  statisticsModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAddModal(state) {
      state.addModal = !state.addModal;
    },
    setStatisticsModal(state) {
      state.statisticsModal = !state.statisticsModal;
    },
  },
});

export const { setAddModal, setStatisticsModal } = modalSlice.actions;

export default modalSlice.reducer;
