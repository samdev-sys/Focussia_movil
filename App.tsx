
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HubScreen from './screens/HubScreen';
import MatrixScreen from './screens/MatrixScreen';
import WheelScreen from './screens/WheelScreen';
import ActionPlanScreen from './screens/ActionPlanScreen';
import ProfileScreen from './screens/ProfileScreen';
import SuccessScreen from './screens/SuccessScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNav = ['/', '/register', '/success', '/settings'].includes(location.pathname);

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden">
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/hub" element={<HubScreen />} />
        <Route path="/matrix" element={<MatrixScreen />} />
        <Route path="/wheel" element={<WheelScreen />} />
        <Route path="/action" element={<ActionPlanScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
