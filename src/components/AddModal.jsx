import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddNewTodoForm from "./AddNewTodoForm";
import { useDispatch, useSelector } from "react-redux";
import { setAddModal } from "../lib/redux-toolkit/slices/modal-slice";
import Login from "./Login";

export default function AddModal() {
  const { addModal } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  function handler() {
    dispatch(setAddModal());
  }

  return user ? (
    <Dialog open={addModal} onOpenChange={handler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi todo qo'shish</DialogTitle>
          <DialogDescription>
            Siz bu yerda yangi todo qo'shishingiz mumkin
          </DialogDescription>
        </DialogHeader>
        <AddNewTodoForm />
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog open={addModal} onOpenChange={handler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kirish</DialogTitle>
          <DialogDescription>Login qiling og'ayni</DialogDescription>
        </DialogHeader>
        <Login />
      </DialogContent>
    </Dialog>
  );
}
