import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import { getCompany } from '../api.js';

export default function CompanyPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCompany().then(setData).catch(() => {});
  }, []);

  return (
    <>
      <div
        className="companyIntro"
        style={{
          backgroundImage:
            'url("//sf16-sg.tiktokcdn.com/obj/eden-sg/0eh7lpquhpanuhf/pc.png")',
        }}
      ></div>

      {data && (
        <>
          <section className="company-intro">
            <div className="container narrow">
              <p>{data.intro}</p>
              <p>{data.ownership}</p>
            </div>
          </section>

          <section className="company-stats">
            <div className="container stats-grid">
              {data.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="company-mandate">
            <div className="container narrow">
              <h2>Our mandate</h2>
              <p>{data.mandate}</p>
              <Link to="/" className="cta-btn">
                Explore open roles
              </Link>
            </div>
          </section>
        </>
      )}
      <Footer />
    </>
  );
}
