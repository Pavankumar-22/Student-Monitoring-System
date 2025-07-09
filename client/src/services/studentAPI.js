const API_URL = "/students";

// GET all students
export const getAllStudents = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }
  return await res.json();
};

// POST create student
export const createStudent = async (student) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return await res.json();
};

// GET single student by ID
export const getStudentById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Student not found");
  }
  return await res.json();
};

// PUT update student
export const updateStudent = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return await res.json();
};

// DELETE student
export const deleteStudent = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if(!res.ok){
    throw new Error("Failed to delete Student")
  }
  return await res.json();
};
