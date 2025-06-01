import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function validation(obj) {
  if (obj.title.trim().length < 6) {
    return { target: "title", message: "Sarlavhani kiriting" };
  }

  return false;
}

export function loginValidation(obj) {
  if (obj.username.trim().length === 0) {
    return { target: "username", message: "Enter username" };
  }

  if (obj.password.trim().length === 0) {
    return { target: "password", message: "Enter password" };
  }

  return false;
}

export function statisticsCount(data) {
  let result = {};
  const colors = {
    medium: "rgb(37, 99, 235)",
    high: "rgb(96, 168, 251)",
    low: "rgb(59, 134, 247)",
  };
  data.forEach(({ priority }) => {
    if (priority in result) {
      result[priority] += 1;
    } else {
      result[priority] = 1;
    }
  });

  result = Object.entries(result).map(([key, value]) => {
    return { priority: key, count: value, fill: colors[key] };
  });

  return result;
}
