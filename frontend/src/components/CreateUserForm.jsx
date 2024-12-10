import React, { useState } from 'react';
import { registerUser } from '../service/UserApi';
import './CreateUserForm.css'
const CreateUserForm = ({ setUsers , fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newUser = { name, email, password };

    try {
      const response = await registerUser(newUser);
      if (response) {
        fetchUsers();
        alert('User created successfully!');
        setUsers((prevUsers) => [...prevUsers, response]); // Thêm user mới vào danh sách
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-form">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>
        <br />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
