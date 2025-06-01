import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Toaster } from "sonner";
import AddModal from "./components/AddModal.jsx";
import StatisticModal from "./components/StatisticModal.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <AddModal />
    <StatisticModal />
    <Toaster position="top-right" richColors />
  </>
);
