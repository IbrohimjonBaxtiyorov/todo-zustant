import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  data: [],
  loading: false,
  error: null,
  filter: {
    priority: "",
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      if (payload) {
        localStorage.setItem("user", JSON.stringify(payload));
      } else {
        localStorage.removeItem("user");
      }
      state.user = payload;
    },
    setData(state, { payload }) {
      state.data = payload;
    },
    addData(state, { payload }) {
      state.data.unshift(payload);
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { setData, setLoading, setFilter, addData, setUser } =
  todoSlice.actions;

export default todoSlice.reducer;
