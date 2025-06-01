import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddNewTodoForm from "./AddNewTodoForm";
import Login from "./Login";
import useTodoStore from "../lib/zustant";

export default function AddModal() {
  const { user, addModal,setAddModal } = useTodoStore();

  function handler() {
    setAddModal();
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
