import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJob } from '../api.js';

const URL_RE = /(https?:\/\/[^\s]+)/g;
const URL_TEST = /^https?:\/\/[^\s]+$/;

// Turn any URLs in a string into links that open in a new window.
function linkify(text) {
  if (typeof text !== 'string') return text;
  const parts = text.split(URL_RE);
  return parts.map((part, i) => {
    if (URL_TEST.test(part)) {
      // Strip a trailing punctuation char so it isn't swallowed by the link.
      const trailing = /[.,;:)]$/.test(part) ? part.slice(-1) : '';
      const url = trailing ? part.slice(0, -1) : part;
      return (
        <span key={i}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="detail-link">
            {url}
          </a>
          {trailing}
        </span>
      );
    }
    return part;
  });
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'label':
      return (
        <p key={i} className="detail-label">
          {linkify(block.text)}
        </p>
      );
    case 'p':
      return (
        <p key={i} className="detail-p">
          {linkify(block.text)}
        </p>
      );
    case 'ul':
      return (
        <ul key={i} className="detail-list">
          {block.items.map((it, j) => (
            <li key={j}>{linkify(it)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className="detail-list detail-list-ordered">
          {block.items.map((it, j) => (
            <li key={j}>{linkify(it)}</li>
          ))}
        </ol>
      );
    case 'gap':
      return <div key={i} className="detail-gap" />;
    default:
      return null;
  }
}

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setJob(null);
    setNotFound(false);
    window.scrollTo(0, 0);
    getJob(id)
      .then(setJob)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="container job-detail">
        <p className="hint">Job not found.</p>
        <Link className="back-link" to="/">
          ‹ Back to all jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container job-detail">
        <p className="hint">Loading…</p>
      </div>
    );
  }

  const meta = [
    job.location,
    job.employmentType,
    job.categoryLabel || job.category,
    job.program,
  ].filter(Boolean);

  const sections = job.detail?.sections;

  return (
    <div className="container job-detail">
      <h1 className="job-detail-title">{job.title}</h1>
      <div className="job-item-meta">
        {meta.map((m, i) => (
          <span key={i} className="meta-piece">
            {m}
          </span>
        ))}
        <span className="meta-piece job-id">Job ID: {job.id}</span>
      </div>

      <button className="apply-btn-top">Apply to this job</button>

      {sections ? (
        <div className="job-detail-body">
          {sections.map((sec, si) => (
            <section key={si} className="detail-section">
              <h2 className="detail-heading">{sec.heading}</h2>
              {sec.blocks.map(renderBlock)}
            </section>
          ))}
        </div>
      ) : (
        <div className="job-detail-body">
          {job.descLabel && <p className="detail-label">{job.descLabel}</p>}
          <p className="detail-p">{job.description}</p>
        </div>
      )}

      <button className="apply-btn-lg">Apply</button>
    </div>
  );
}
