import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindJobs from './pages/FindJobs';
import JobDetail from './pages/JobDetail';
import BrowseCompanies from './pages/BrowseCompanies';
import SearchCompanies from './pages/SearchCompanies';
import CompanyProfile from './pages/CompanyProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/companies" element={<BrowseCompanies />} />
        <Route path="/companies/search" element={<SearchCompanies />} />
        <Route path="/companies/:id" element={<CompanyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
