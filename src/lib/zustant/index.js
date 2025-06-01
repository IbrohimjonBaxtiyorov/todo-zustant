import { create } from "zustand";

const useTodoStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")),
  data: [],
  loading: false,
  error: null,
  addModal: false,
  statisticModal: false,
  filter: {
    priority: "",
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },

  setData: (data) => {
    set({ data });
  },

  addData: (item) => {
    set((state) => ({ data: [item, ...state.data] }));
  },

  setLoading: (loading) => set({ loading }),
  setFilter: (filter) => set({ filter }),
  setAddModal: () => {
    set((state) => ({ addModal: !state.addModal }));
  },
  setStatisticModal: () => {
    set((state) => ({ statisticModal: !state.statisticModal }));
  },
}));

export default useTodoStore;
