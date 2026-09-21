import { Link } from 'react-router-dom';

export default function ExploreRolesCTA() {
  return (
    <section className="culture-cta">
      <div className="container narrow">
        <h2>Ready to build with us?</h2>
        <p>Discover roles across our teams and find where you belong.</p>
        <Link to="/" className="cta-btn">
          Explore open roles
        </Link>
      </div>
    </section>
  );
}
