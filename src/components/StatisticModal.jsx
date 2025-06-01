import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setStatisticsModal } from "../lib/redux-toolkit/slices/modal-slice";
import { getStatistics } from "../request";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import MyPieChart from "./MyPieChart";
import { statisticsCount } from "../lib/utils";

export default function StatisticModal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { statisticsModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  function handler() {
    dispatch(setStatisticsModal());
  }

  useEffect(() => {
    if (statisticsModal) {
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
  }, [statisticsModal]);

  return (
    <Dialog open={statisticsModal} onOpenChange={handler}>
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
