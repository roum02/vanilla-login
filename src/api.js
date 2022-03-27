// export const fetchTodos = () => {
//   return fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// };

const host = 8080;
const localhost = `http://localhost:${host}`;

export async function handlePost(path, body, headers = {}) {
  const url = `${localhost}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export async function handleNoResPost(path, body, headers = {}) {
  const url = `${localhost}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  if (res.ok) {
    //console.log(res.ok);
    return res.ok;
  } else {
    throw Error();
  }
}

export async function handlePut(id, body, headers = {}) {
  const url = `${localhost}/auth/common/user/${id}/password`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}
