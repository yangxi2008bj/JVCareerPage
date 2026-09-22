import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const LOGO = '//sf16-sg.tiktokcdn.com/obj/eden-sg/0eh7lpquhpanuhf/20260408-171806.png';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  const signOut = () => {
    setOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner">
        <a className="logo" href="https://usdsjv.tiktok.com/" target="_blank" rel="noopener noreferrer">
          <img src={LOGO} alt="TikTok USDS" />
        </a>
        <nav className="nav">
          <a href="https://usdsjv.tiktok.com/" target="_blank" rel="noopener noreferrer">
            Company
          </a>
          <a
            href="https://usdsjv.tiktok.com/newsroom"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newsroom
          </a>
          <NavLink to="/usds/team">Teams</NavLink>
          <NavLink to="/usds/culture">Our Ways of Working</NavLink>
          <NavLink to="/" end className="nav-jobs">
            Jobs
          </NavLink>
          <div className="nav-item-dropdown">
            <NavLink to="/usds/hiring-process">Hiring Process</NavLink>
            <div className="nav-submenu">
              <NavLink to="/usds/hiring-process" end>
                Apply to TikTok USDS JV
              </NavLink>
              <NavLink to="/usds/hiring-process/interview-tips">Interview Tips</NavLink>
              <NavLink to="/usds/hiring-process/faq">FAQ</NavLink>
            </div>
          </div>
          {user ? (
            <div className="user-menu" ref={menuRef}>
              <button
                className="user-trigger"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
              >
                <span>{user.display}</span>
                <svg
                  className={`caret ${open ? 'up' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {open && (
                <div className="user-dropdown">
                  <button onClick={() => go('/usds/resume')}>My Resume</button>
                  <button onClick={() => go('/usds/applications')}>My Applications</button>
                  <button onClick={signOut}>Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/usds/login" className="nav-signin">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
