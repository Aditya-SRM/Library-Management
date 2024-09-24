import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin-dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import BookManagement from './components/BookManagement';
import Membership from './components/Membership';
import UserManagement from './components/UserManagement';
import PayFine from './components/PayFine';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book-management" element={<BookManagement />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-book" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AddBook />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/update-book" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <UpdateBook />
                </ProtectedRoute>
              } 
            />
            <Route path="/pay-fine" element={<PayFine />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
