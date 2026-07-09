import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import FindJobs from './pages/FindJobs';
import JobDetail from './pages/JobDetail';
import BrowseCompanies from './pages/BrowseCompanies';
import SearchCompanies from './pages/SearchCompanies';
import CompanyProfile from './pages/CompanyProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerCompanyProfile from './pages/EmployerCompanyProfile';
import AllApplicants from './pages/AllApplicants';
import Messages from './pages/Messages';
import MyApplications from './pages/MyApplications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/companies" element={<BrowseCompanies />} />
          <Route path="/companies/search" element={<SearchCompanies />} />
          <Route path="/companies/:id" element={<CompanyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/company-profile" element={<EmployerCompanyProfile />} />
          <Route path="/employer/applicants" element={<AllApplicants />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpCenter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}