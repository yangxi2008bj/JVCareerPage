import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cols">
          <div className="footer-col">
            <h5>Company</h5>
            <Link to="/company">About</Link>
            <Link to="/newsroom">Newsroom</Link>
            <Link to="/">Jobs</Link>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <a href="#">Community Guidelines</a>
            <a href="#">Transparency</a>
            <a href="#">Safety Center</a>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TikTok USDS Joint Venture LLC</span>
        </div>
      </div>
    </footer>
  );
}
