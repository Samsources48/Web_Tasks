import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { LoginPage, DashboardPage, TaskPage, UserCreationPage, BoardPage, CategoryTaskPages } from './pages';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminRoute } from './components/auth/AdminRoute';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fb923c', /* Orange */
          colorInfo: '#fb923c',
          colorSuccess: '#fb923c',
          borderRadius: 8,
          fontFamily: "'Geist Variable', 'Inter', system-ui, sans-serif",
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f8fafc',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={
            <>
              <SignedOut>
                <LoginPage />
              </SignedOut>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
            </>
          } />

          {/* Protected Dashboard Routes */}
          <Route element={
            <>
              <SignedIn>
                <DashboardLayout />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/users" element={
              <AdminRoute>
                <UserCreationPage />
              </AdminRoute>
            } />
            <Route path="/category" element={
              <AdminRoute>
                <CategoryTaskPages />
              </AdminRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
