// src/components/UsersTable.jsx
import React, { useState, useEffect } from 'react';
import './table.css';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2 className="card-title">All Users</h2>
      <div className="card-content">
        {loading ? (
          <p className="table-empty">Loading users…</p>
        ) : users.length === 0 ? (
          <p className="table-empty">No users found.</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.fullName}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="capitalize">{user.role}</td>
                    <td>{user.department}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
