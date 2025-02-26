"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/userService";
import { User } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers()
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
}
