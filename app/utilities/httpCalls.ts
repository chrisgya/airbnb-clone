async function get<T>(url: string): Promise<T | T[]> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

async function post<T1, T2>(url: string, body: T1): Promise<T2> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

async function put<T1, T2>(url: string, body?: T1): Promise<T2> {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  return res.json();
}

async function remove<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

const httpCalls = { get, post, put, remove };
export default httpCalls;
