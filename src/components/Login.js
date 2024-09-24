import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('guest'); // default role is 'guest'
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // Validate if username and password are entered
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    // Distinguish between Admin and Guest login
    if (role === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        login('admin'); // Update auth context
        navigate('/admin-dashboard'); // Navigate to Admin Dashboard
      } else {
        alert('Invalid Admin credentials');
      }
    } else if (role === 'guest') {
      if (username && password) {
        login('guest'); // Update auth context
        navigate('/dashboard'); // Navigate to Guest Dashboard
      } else {
        alert('Invalid Guest credentials');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
        <div className="mb-4 flex justify-around">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">Admin</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="guest"
              checked={role === 'guest'}
              onChange={() => setRole('guest')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">Guest</span>
          </label>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
