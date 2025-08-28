import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { MainLayout } from '@/components/layout/main-layout';
import { LoginPage } from '@/pages/auth/login-page';
import { LeaderDashboard } from '@/pages/leader/leader-dashboard';
import { EmployeeProfile } from '@/pages/leader/employee-profile';
import { TeamPage } from '@/pages/leader/team-page';
import { FeedbackPage } from '@/pages/leader/feedback-page';
import { ManagementPage } from '@/pages/admin/management-page';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/leader/dashboard" />} />
            <Route path="leader/dashboard" element={<LeaderDashboard />} />
            <Route path="leader/team" element={<TeamPage />} />
            <Route path="leader/team/:employeeId" element={<EmployeeProfile />} />
            <Route path="leader/feedback" element={<FeedbackPage />} />
            <Route path="admin/management" element={<ManagementPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
