import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const CULTURE_IMG =
  'https://core-normal.traeapiusds.us/api/ide/v1/text_to_image?prompt=diverse%20team%20of%20professionals%20collaborating%20in%20a%20bright%20modern%20tech%20office%2C%20laughing%2C%20natural%20light%2C%20candid%20photography%2C%20warm%20tones&image_size=landscape_16_9';

const VALUES = [
  {
    title: 'Always Day 1',
    desc: 'We keep the curiosity and drive of a first day, staying humble, moving fast, and never taking success for granted.',
  },
  {
    title: 'Be Candid & Clear',
    desc: 'We communicate openly and directly, share context generously, and give feedback that helps each other grow.',
  },
  {
    title: 'Aim For The Highest',
    desc: 'We set ambitious goals and hold ourselves to a high bar, delivering quality work that we are proud of.',
  },
  {
    title: 'Be Brave, Be a Builder',
    desc: 'We take ownership, embrace new challenges, and turn ideas into products that reach millions of people.',
  },
];

const PILLARS = [
  {
    title: 'Diversity & Inclusion',
    desc: 'We celebrate the diverse voices among us and build an organization that reflects the diversity of our communities. Individuals are considered based on their strengths and experience.',
  },
  {
    title: 'Growth & Learning',
    desc: 'From mentorship to hands-on projects, we invest in continuous learning so every team member can develop new skills and advance their career.',
  },
  {
    title: 'Wellbeing & Balance',
    desc: 'We support our people with comprehensive benefits and a culture that respects balance, so you can do your best work and thrive outside of it.',
  },
];

export default function CulturePage() {
  return (
    <>
      <div className="culture-hero" style={{ backgroundImage: `url("${CULTURE_IMG}")` }}>
        <div className="culture-hero-overlay">
          <div className="container">
            <h1>Culture</h1>
            <p>
              Our mission is to inspire creativity and bring joy. We build a workplace where people
              feel they belong and are empowered to do the best work of their lives.
            </p>
          </div>
        </div>
      </div>

      <section className="culture-values">
        <div className="container">
          <h2>Our values</h2>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="culture-pillars">
        <div className="container">
          <h2>Life at TikTok USDS</h2>
          <div className="pillars-grid">
            {PILLARS.map((p) => (
              <div className="pillar-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="culture-cta">
        <div className="container narrow">
          <h2>Ready to build with us?</h2>
          <p>Discover roles across our teams and find where you belong.</p>
          <Link to="/" className="cta-btn">
            Explore open roles
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
