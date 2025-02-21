import './App.css';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import IndexPage from './pages/IndexPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider, UserContext } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import { useContext } from 'react';

function ProtectedRoute({ children }) {
  const { userInfo } = useContext(UserContext);
  
  if (!userInfo || !userInfo.username) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  const { userInfo } = useContext(UserContext);

  return (
    <UserContextProvider>
      <Routes>
        {!userInfo ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<Navigate to="/index" />} />
        )}
        <Route path="/index" element={
          <ProtectedRoute>
            <Layout />
            <IndexPage />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/create" element={
          <ProtectedRoute>
            <Layout />
              <CreatePost />
          </ProtectedRoute>
        } />
        
        <Route path="/post/:id" element={
          <ProtectedRoute>
            <Layout />
              <PostPage />
          </ProtectedRoute>
        } />
        
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <Layout />
              <EditPost />
          </ProtectedRoute>
        } />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
