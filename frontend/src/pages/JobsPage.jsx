import { useEffect, useState, useCallback } from 'react';
import FilterSidebar from '../components/FilterSidebar.jsx';
import JobCard from '../components/JobCard.jsx';
import { getFilters, getJobs } from '../api.js';

const EMPTY = { jobType: [], program: [], category: [], location: [] };

export default function JobsPage() {
  const [filters, setFilters] = useState(EMPTY);
  const [selected, setSelected] = useState(EMPTY);
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFilters().then(setFilters).catch(() => {});
  }, []);

  const fetchJobs = useCallback(() => {
    setLoading(true);
    getJobs({ ...selected, search })
      .then((data) => {
        setJobs(data.jobs);
        setTotal(data.displayTotal ?? data.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selected, search]);

  useEffect(() => {
    fetchJobs();
  }, [selected]);

  const toggle = (group, option) => {
    setSelected((prev) => {
      const list = prev[group] || [];
      const next = list.includes(option)
        ? list.filter((o) => o !== option)
        : [...list, option];
      return { ...prev, [group]: next };
    });
  };

  const clear = () => {
    setSelected(EMPTY);
    setSearch('');
  };

  return (
    <div className="jobs-page-wrap">
      <section className="jobs-hero">
        <form
          className="hero-search"
          onSubmit={(e) => {
            e.preventDefault();
            fetchJobs();
          }}
        >
          <svg
            className="hero-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M20 20l-3.2-3.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Enter Title, Skill, City or Job ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <div className="container jobs-body">
        <FilterSidebar
          filters={filters}
          selected={selected}
          onToggle={toggle}
          onClear={clear}
        />
        <main className="jobs-main">
          <h2 className="results-title">Find Your New Job ({total})</h2>

          {loading ? (
            <p className="hint">Loading…</p>
          ) : jobs.length === 0 ? (
            <p className="hint">No jobs match your filters.</p>
          ) : (
            <>
              <div className="job-list">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <nav className="pagination" aria-label="Pagination">
                <button className="page-arrow" disabled aria-label="Previous">
                  ‹
                </button>
                <button className="page-num active">1</button>
                <button className="page-num">2</button>
                <button className="page-num">3</button>
                <button className="page-num">4</button>
                <button className="page-num">5</button>
                <span className="page-ellipsis">…</span>
                <button className="page-num">36</button>
                <button className="page-arrow" aria-label="Next">
                  ›
                </button>
              </nav>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
