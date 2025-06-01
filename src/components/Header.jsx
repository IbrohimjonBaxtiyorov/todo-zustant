import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { ChartNoAxesCombined, PlusCircle } from "lucide-react";

import useTodoStore from "../lib/zustant";

export default function Header() {
  const { setFilter,setAddModal,setStatisticModal } = useTodoStore();
  function handleFilter(priority) {
    setFilter({ priority });
  }

  function handleClick() {
    setAddModal()
  }

  return (
    <header className="py-5 shadow-md fixed left-0 right-0 bg-white">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <h1 className="font-medium text-3xl">Todo app</h1>
        <div className="flex items-center gap-5">
          <strong>Daraja bo'yicha filterlash:</strong>
          <Select onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Daraja bo'yicha filterlash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medium">O'rta</SelectItem>
              <SelectItem value="high">Yuqori</SelectItem>
              <SelectItem value="low">Quyi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant={"outline"}
          onClick={() => {
            setStatisticModal()
          }}
        >
          <ChartNoAxesCombined />
          Statistics
        </Button>
        <Button onClick={handleClick}>
          <PlusCircle />
          New
        </Button>
      </div>
    </header>
  );
}
