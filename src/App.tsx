import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { LoginPage, DashboardPage, TaskPage, UserCreationPage } from './pages';
import { DashboardLayout } from './components/layout/DashboardLayout';
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
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/users" element={<UserCreationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
