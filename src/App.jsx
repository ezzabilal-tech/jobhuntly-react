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
import Messages from './pages/Messages';
import MyApplications from './pages/MyApplications';

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
          <Route path="/messages" element={<Messages />} />
          <Route path="/applications" element={<MyApplications />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
