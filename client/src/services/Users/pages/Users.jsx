// src/services/Users/pages/Users.jsx
import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../../api/userAPI";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.username} ({u.role}) <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
