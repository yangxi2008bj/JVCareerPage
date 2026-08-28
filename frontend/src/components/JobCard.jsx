import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  const meta = [
    job.location,
    job.employmentType,
    job.categoryLabel || job.category,
    job.program,
  ].filter(Boolean);

  return (
    <Link className="job-item" to={`/jobs/${job.id}`}>
      <h3 className="job-item-title">{job.title}</h3>
      <div className="job-item-meta">
        {meta.map((m, i) => (
          <span key={i} className="meta-piece">
            {m}
          </span>
        ))}
        <span className="meta-piece job-id">Job ID: {job.id}</span>
      </div>
    </Link>
  );
}
