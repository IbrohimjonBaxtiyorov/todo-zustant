const baseURL = import.meta.env.VITE_BASE_URL;

export async function getTodos(filter) {
  const query = {};
  const url = new URL(baseURL + "/todos");
  const queryList = Object.entries(filter);
  queryList.forEach(([key, value]) => {
    if (value !== "") {
      query[key] = value;
    }
  });

  if (Object.keys(query).length > 0) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const req = await fetch(url.href);

  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}

export async function addTodo(todo) {
  const user = JSON.parse(localStorage.getItem("user"));
  const req = await fetch(baseURL + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(todo),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}

export async function login(user) {
  const req = await fetch(baseURL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}

export async function deleteTodo(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const req = await fetch(baseURL + "/todos/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });
  if (req.status === 200) {
    return id;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}

export async function getStatistics() {
  const req = await fetch(baseURL + "/todos");
  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}
