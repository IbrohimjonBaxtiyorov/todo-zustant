import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { validation } from "../lib/utils";
import { toast } from "sonner";
import { addTodo } from "../request";
import useTodoStore from "../lib/zustant";

export default function AddNewTodoForm() {
  const [addLoading, setAddLoading] = useState(false);
  const [sending, setSending] = useState(null);
  const { addData, setUser, setAddModal } = useTodoStore();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sendData = {};
    formData.forEach((value, key) => {
      if (key === "completed") {
        sendData[key] = value === "completed";
      } else {
        sendData[key] = value;
      }
    });

    const result = validation(sendData);

    if (result) {
      const { target, message } = result;
      e.target[target]?.focus();
      toast.info(message);
    } else {
      setSending(sendData);
    }
  }

  useEffect(() => {
    if (sending) {
      setAddLoading(true);
      addTodo(sending)
        .then(
          (res) => {
            addData(res);
            setAddModal();
          },
          ({ message }) => {
            toast.error(message);
          }
        )
        .finally(() => {
          setAddLoading(false);
          setSending(null);
        });
    }
  }, [sending]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-scale">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Sarlavha*</Label>
        <Input
          name="title"
          type="text"
          id="title"
          placeholder="Sarlavhani kiriting"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Holati*</Label>
        <RadioGroup name="completed" defaultValue="uncompleted">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="completed" id="completed" />
            <Label htmlFor="completed">Bajarilgan ✅</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="uncompleted" id="uncompleted" />
            <Label htmlFor="uncompleted">Bajarilmagan ❌</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Muhimlilik darajasi*</Label>
        <Select defaultValue="low" name="priority">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Daraja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">Yuqori</SelectItem>
            <SelectItem value="medium">O'rta</SelectItem>
            <SelectItem value="low">Quyi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Button disabled={addLoading}>
          {addLoading ? <RefreshCcw className="animate-spin" /> : "Tasdiqlash"}
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            const yes = confirm("Rostan tizimdan chiqmoqchimisiz?");
            if (yes) {
              toast.success("Xayrlashmadik, kutib qolamiz");
              setUser(null);
            }
          }}
        >
          Log out
        </Button>
      </div>
    </form>
  );
}
