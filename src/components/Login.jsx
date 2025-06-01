import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { loginValidation } from "../lib/utils";
import { login } from "../request";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../lib/redux-toolkit/slices/todo-slice";

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sendData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const result = loginValidation(sendData);

    if (result) {
      const { target, message } = result;
      e.target[target]?.focus();
      toast.info(message);
    } else {
      setLoading(true);
      login(sendData)
        .then(
          (res) => {
            dispatch(setUser(res));
            toast.success("Login qildingiz");
          },
          ({ message }) => {
            toast.error(message);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-scale">
      <div className="grid w-full max-w-full items-center gap-1.5">
        <Label htmlFor="username">Username*</Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
      </div>
      <div className="grid w-full max-w-full items-center gap-1.5">
        <Label htmlFor="password">Password*</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </div>
      <Button disabled={loading}>{loading ? "Loading..." : "Kirish"}</Button>
    </form>
  );
}
