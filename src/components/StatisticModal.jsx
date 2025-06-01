import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStatistics } from "../request";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import MyPieChart from "./MyPieChart";
import { statisticsCount } from "../lib/utils";
import useTodoStore from "../lib/zustant";

export default function StatisticModal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setStatisticModal, statisticModal } = useTodoStore();

  function handler() {
    setStatisticModal();
  }

  useEffect(() => {
    if (setStatisticModal) {
      setLoading(true);
      getStatistics()
        .then(
          (res) => {
            setData(statisticsCount(res));
          },
          ({ message }) => {
            toast.error(message);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }, [statisticModal]);

  return (
    <Dialog open={statisticModal} onOpenChange={handler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Statistikani ko'rish</DialogTitle>
          <DialogDescription>
            Siz bu yerda statistikani ko'rishingiz mumkin
          </DialogDescription>
        </DialogHeader>
        {loading && (
          <div className="flex justify-center">
            <Skeleton
              className={"w-[300px] h-[300px] bg-slate-400 rounded-full"}
            />
          </div>
        )}
        {!loading && <MyPieChart data={data} />}
      </DialogContent>
    </Dialog>
  );
}
