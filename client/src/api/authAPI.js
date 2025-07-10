const AUTH_API_URL = "/auth";

export const loginUser = async (credentials) => {
  const res = await fetch(`${AUTH_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorData = await res.json();
    return { success: false, message: errorData.error || "Login failed" };
  }
  const data = await res.json();
  // Save token here if you want, e.g. localStorage.setItem('token', data.token);
  return { success: true, data };
};

export const registerUser = async (userData) => {
  const res = await fetch(`${AUTH_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    return { success: false, message: errorData.error || "Registration failed" };
  }
  const data = await res.json();
  return { success: true, data };
};
