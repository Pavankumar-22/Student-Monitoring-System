// src/services/Users/api/userApi.js
const BASE = "/api/users";

export const fetchUsers = async () => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return await res.json();
};
