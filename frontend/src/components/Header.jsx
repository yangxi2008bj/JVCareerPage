import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const LOGO = '//sf16-sg.tiktokcdn.com/obj/eden-sg/0eh7lpquhpanuhf/20260408-171806.png';

const TEAM_MENU = [
  { name: 'R&D', slug: 'rd' },
  { name: 'Product', slug: 'product' },
  { name: 'Design', slug: 'design' },
  { name: 'Marketing', slug: 'marketing' },
  { name: 'Corporate Functions', slug: 'corporate-functions' },
  { name: 'Operations', slug: 'operations' },
  { name: 'Sales', slug: 'sales' },
];

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
        <Link className="logo" to="/company">
          <img src={LOGO} alt="TikTok USDS" />
        </Link>
        <nav className="nav">
          <NavLink to="/company">Company</NavLink>
          <NavLink to="/newsroom">Newsroom</NavLink>
          <div className="nav-item-dropdown">
            <NavLink to="/usds/team">Team</NavLink>
            <div className="nav-submenu">
              {TEAM_MENU.map((team) => (
                <Link key={team.slug} to={`/usds/team/${team.slug}`}>
                  {team.name}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/usds/culture">Culture</NavLink>
          <NavLink to="/" end className="nav-jobs">
            Jobs
          </NavLink>
          <NavLink to="/usds/faq">FAQ</NavLink>
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
