import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function ApplicationsPage() {
  const { resume } = useAuth();

  return (
    <div className="applications-page">
      <div className="container">
        <h1 className="resume-title">My Applications</h1>

        <div className="applications-empty">
          <p className="empty-title">You haven't applied to any positions yet.</p>
          <p className="empty-sub">
            {resume
              ? 'Your resume is ready. Browse open roles and start applying.'
              : 'Create your resume first, then browse open roles and start applying.'}
          </p>
          <div className="empty-actions">
            <Link to="/" className="empty-btn primary">
              Browse Jobs
            </Link>
            <Link to="/usds/resume" className="empty-btn">
              {resume ? 'View My Resume' : 'Create Resume'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
