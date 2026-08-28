import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import JobsPage from './pages/JobsPage.jsx';
import JobDetailPage from './pages/JobDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import NewsroomPage from './pages/NewsroomPage.jsx';
import ResumePage from './pages/ResumePage.jsx';
import ApplicationsPage from './pages/ApplicationsPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import DepartmentPage from './pages/DepartmentPage.jsx';
import CulturePage from './pages/CulturePage.jsx';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/newsroom" element={<NewsroomPage />} />
        <Route path="/usds/team" element={<TeamPage />} />
        <Route path="/usds/team/:slug" element={<DepartmentPage />} />
        <Route path="/usds/culture" element={<CulturePage />} />
        <Route path="/usds/login" element={<LoginPage />} />
        <Route path="/usds/resume" element={<ResumePage />} />
        <Route path="/usds/applications" element={<ApplicationsPage />} />
        <Route path="/usds/faq" element={<FaqPage />} />
      </Routes>
    </div>
  );
}
