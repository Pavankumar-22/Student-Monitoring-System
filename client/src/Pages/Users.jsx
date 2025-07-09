import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/userAPI";
import SearchBar from "../components/SearchBar";
import UserForm from "../components/UserForm";
import "../styles/Students.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setFiltered(data);
      setSelectedUser(data[0] || null);
    });
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const results = users.filter((u) => {
      const name = u.name?.toLowerCase() || "";
      const email = u.email?.toLowerCase() || "";
      const role = u.role?.toLowerCase() || "";
      return name.includes(lower) || email.includes(lower) || role.includes(lower);
    });
    setFiltered(results);
    if (!results.find((u) => u._id === selectedUser?._id)) {
      setSelectedUser(results[0] || null);
    }
  }, [searchTerm, users]);

  const handleSelect = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    const updated = users.filter((u) => u._id !== id);
    setUsers(updated);
    setFiltered(updated);
    if (selectedUser?._id === id) {
      setSelectedUser(null);
    }
  };

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <h2>Users</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ul className="dash-student-list">
          {filtered.map((user) => (
            <li
              key={user._id}
              className={`dash-student-item ${
                selectedUser?._id === user._id ? "active" : ""
              }`}
              onClick={() => handleSelect(user)}
            >
              <div>
                <strong>{user.name || "N/A"}</strong>
                <br />
                <small>{user.email}</small>
                <br />
                <span className={`role ${user.role}`}>{user.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="dash-main">
        {selectedUser ? (
          <div className="user-detail">
            <h3>{selectedUser.name || "N/A"}</h3>
            <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>
            <p><strong>Role:</strong> {selectedUser.role || "N/A"}</p>
            <p><strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleDateString() || "N/A"}</p>
            <p><strong>Last Login:</strong> {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : "Never"}</p>
            <p><strong>Status:</strong> {selectedUser.isActive ? "Active" : "Inactive"}</p>

            <div className="user-actions">
              <button
                className="danger"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this user?")) {
                    handleDelete(selectedUser._id);
                  }
                }}
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

export default Users;