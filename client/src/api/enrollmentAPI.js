const API_URL = "/api/enrollments";

export const getAllEnrollments = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch enrollments");
  return await res.json();
};

export const createEnrollment = async (enrollment) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrollment),
  });
  return await res.json();
};

export const deleteEnrollment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete enrollment");
  return await res.json();
};

export const updateEnrollment = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update enrollment");
  return await res.json();
};
