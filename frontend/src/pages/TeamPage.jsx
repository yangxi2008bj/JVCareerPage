import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const TEAMS = [
  {
    name: 'R&D',
    slug: 'rd',
    desc: 'The Research and Development Team drives our business forward by refining and improving our current products to meet the demands of global users, as well as exploring entirely new innovations for the future.',
  },
  {
    name: 'Product',
    slug: 'product',
    desc: 'Focusing on innovation and direction, the Product Team investigates, identifies, and guides the success of our world-class platforms. They drive product development and make an impact by analyzing the market, determining the vision and strategy, and collaborating with other teams.',
  },
  {
    name: 'Design',
    slug: 'design',
    desc: 'With incredible creativity and artistic skill, the Design Team shapes the visual representation of our products and businesses. They create unique designs that are not just visually appealing, but also express the aesthetic of our brand.',
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    desc: 'Combining creativity and market research, the Marketing Team captivates consumers and business partners alike by leading our branding, advertising, communications, and media strategies around the world. They strive to elevate the visibility of our brand globally.',
  },
  {
    name: 'Corporate Functions',
    slug: 'corporate-functions',
    desc: 'The Corporate Functions Team anticipates and addresses organizational problems to ensure that we continue growing and operating efficiently. They provide solutions by combining the resources of Human Resources, Legal & Policy, Finance, and Support.',
  },
  {
    name: 'Operations',
    slug: 'operations',
    desc: 'Utilizing strong analytical abilities, the Operations Team ensures that the quality of our products meets the expectations and needs of our users. They are passionate about using our products to empower and bring joy to our global community.',
  },
  {
    name: 'Sales',
    slug: 'sales',
    desc: 'Our Sales Team does more than just generate revenue. By building strong relationships and providing a positive customer experience, they create valuable connections between our products/services and our customers.',
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Teams</h1>
          <p>
            Explore the teams that power TikTok USDS Joint Venture and find where your skills fit
            best.
          </p>
        </div>
      </section>

      <div className="container team-grid">
        {TEAMS.map((team) => (
          <Link className="team-card" to={`/usds/team/${team.slug}`} key={team.slug}>
            <h3>{team.name}</h3>
            <p>{team.desc}</p>
            <span className="read-more">Learn more</span>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
}
