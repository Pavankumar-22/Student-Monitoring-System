import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../../api/userAPI";
import SearchBar from "../../../shared/layout/SearchBar";
import UserCard from "../components/UserCard";
import "../../../styles/Students.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function UsersPage() {
  const token = localStorage.getItem("token"); // simple token check
  const [showRegister, setShowRegister] = useState(false);

  // State for users (always declared, hooks not called conditionally)
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users only if token exists
  useEffect(() => {
    if (!token) return;

    getAllUsers()
      .then((data) => {
        setUsers(data);
        setFiltered(data);
        setSelectedUser(data[0] || null);
      })
      .catch(() => {
        alert("Failed to load users, please login again.");
        localStorage.removeItem("token");
        window.location.reload();
      });
  }, [token]);

  // Filter users based on search term
  useEffect(() => {
    if (!token) return;

    const lower = searchTerm.toLowerCase();
    const results = users.filter(({ username, email, role }) => {
      return (
        username.toLowerCase().includes(lower) ||
        email.toLowerCase().includes(lower) ||
        role.toLowerCase().includes(lower)
      );
    });
    setFiltered(results);
    if (!results.find((u) => u._id === selectedUser?._id)) {
      setSelectedUser(results[0] || null);
    }
  }, [searchTerm, users, selectedUser, token]);

  const handleSelect = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      const updated = users.filter((u) => u._id !== id);
      setUsers(updated);
      setFiltered(updated);
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  // Show login/register if no token
  if (!token) {
    return (
      <div className="auth-page">
        {showRegister ? <RegisterPage /> : <LoginPage />}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    );
  }

  // Main UI when logged in
  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <h2>Users</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ul className="dash-student-list">
          {filtered.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              isActive={selectedUser?._id === user._id}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </aside>

      <main className="dash-main">
        {selectedUser ? (
          <div className="user-detail">
            <h3>{selectedUser.username || "N/A"}</h3>
            <p>
              <strong>Email:</strong> {selectedUser.email || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role || "N/A"}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {selectedUser.createdAt
                ? new Date(selectedUser.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            {selectedUser.lastLogin && (
              <p>
                <strong>Last Login:</strong>{" "}
                {new Date(selectedUser.lastLogin).toLocaleDateString()}
              </p>
            )}
            <p>
              <strong>Status:</strong>{" "}
              {selectedUser.isActive ? "Active" : "Inactive"}
            </p>

            <div className="user-actions">
              <button
                className="danger"
                onClick={() => handleDelete(selectedUser._id)}
              >
                Delete User
              </button>
            </div>
          </div>
        ) : (
          <p className="dash-empty">Select a user</p>
        )}
      </main>
    </div>
  );
}

export default UsersPage;
