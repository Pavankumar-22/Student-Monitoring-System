import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../../api/userAPI";
import { useAuth } from "../../../context/authContext";
import UserCard from "../components/UserCard";
import "../../../styles/Users.css";

function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers().then(setUsers).catch(console.error);
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (user?.role === "staff") {
  return (
    <div className="users-wrapper">
      <div className="user-details">
        <h3>👤 Your Profile</h3>
        <ul className="user-list">
          <UserCard user={user} isActive={true} onSelect={() => {}} />
        </ul>
      </div>
    </div>
  );
}

  return (
    <div className="users-wrapper">
      <div className="users-list">
        <h2>👥 All Users</h2>
        <ul className="user-list">
          {users.map((u) => (
            <li key={u._id} className="user-item">
              <strong>{u.username}</strong> ({u.role})
              <br />
              <button className="user-btn" onClick={() => setSelectedUser(u)}>View</button>
              <button className="user-btn delete" onClick={() => handleDelete(u._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
      <div className="user-details">
        <h3>📋 Selected User Details</h3>
        <UserCard user={selectedUser} isActive={true} onSelect={() => {}} />
      </div>
      )}
    </div>
  );
}

export default Users;
