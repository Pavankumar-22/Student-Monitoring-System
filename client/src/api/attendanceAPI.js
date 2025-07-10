const API_URL = "/api/attendance";

export const getAllAttendanceRecords = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch attendance records");
  return await res.json();
};

export const markAttendance = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteAttendance = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete attendance record");
  return await res.json();
};