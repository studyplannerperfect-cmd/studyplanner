import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { FriendsProvider } from './context/FriendsContext';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import GroupStudy from './components/GroupStudy';
import StudyStatus from './components/StudyStatus';
import Notes from './components/Notes';
import Admin from './components/Admin';
import PasswordReset from './components/PasswordReset';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/signin" element={user ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/calendar" 
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/group-study" 
        element={
          <ProtectedRoute>
            <GroupStudy />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notes" 
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/study-status" 
        element={
          <ProtectedRoute>
            <StudyStatus />
          </ProtectedRoute>
        } 
      />
      <Route path="/admin" element={<Admin />} />
      <Route path="/moderator" element={<ModeratorPanel />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <DataProvider>
            <FriendsProvider>
              <div className="App">
                <AppRoutes />
              </div>
            </FriendsProvider>
          </DataProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;