import { toast } from "sonner";
import { getTodos } from "../request";
import Loading from "./Loading";
import Todo from "./Todo";
import { useEffect } from "react";
import useTodoStore from "../lib/zustant";

export default function Todos() {
  const { setData, setLoading, loading, error, data, filter } = useTodoStore();
  useEffect(() => {
    setLoading(true);
    getTodos(filter)
      .then(
        (res) => {
          setData(res);
        },
        ({ message }) => {
          toast.error(message);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [JSON.stringify(filter)]);

  if (loading) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p>{error}</p>
      </div>
    );
  }

  if (data.lenght === 0) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p>No data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 container mx-auto px-5 pb-10 pt-[116px]">
      {data.map(({ completed, title, id, priority }) => {
        return (
          <Todo
            completed={completed}
            key={id}
            title={title}
            priority={priority}
            id={id}
          />
        );
      })}
    </div>
  );
}
