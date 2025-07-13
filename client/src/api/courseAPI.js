const API_URL = "api/courses/get";

export const getAllCourses = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return await res.json();
};

export const createCourse = async (course) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return await res.json();
};

export const deleteCourse = async (code) => {
  const res = await fetch(`${API_URL}/${code}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete course");
  return await res.json();
};