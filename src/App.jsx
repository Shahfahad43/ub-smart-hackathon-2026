import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AppStateProvider } from './context/AppStateContext';
import AppShell from './components/layout/AppShell';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import RequestForm from './pages/RequestForm';
import Tracker from './pages/Tracker';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import Blackboard from './pages/Blackboard';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppStateProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />

              <Route path="/app" element={<AppShell />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="ai" element={<AIAssistant />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:id" element={<ServiceDetail />} />
                <Route path="services/:id/request" element={<RequestForm />} />
                <Route path="tracker" element={<Tracker />} />
                <Route path="blackboard" element={<Blackboard />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AppStateProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
