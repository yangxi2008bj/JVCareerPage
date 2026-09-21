import Footer from '../components/Footer.jsx';
import ExploreRolesCTA from '../components/ExploreRolesCTA.jsx';

const TEAMS = [
  {
    name: 'Tech & Product',
    slug: 'tech-product',
    desc: 'Builds the systems and tools that support a secure, reliable TikTok experience in the US.',
  },
  {
    name: 'Security & Privacy',
    slug: 'security-privacy',
    desc: "Safeguards US user data and helps secure the platform's systems, infrastructure, and privacy controls.",
  },
  {
    name: 'Trust & Safety',
    slug: 'trust-safety',
    desc: 'Supports content moderation, safety operations, and policy enforcement across the US ecosystem.',
  },
  {
    name: 'Corporate Functions (Public Policy, Comms, Finance, HR, etc.)',
    slug: 'corporate-functions',
    desc: 'Drives the mission forward across Public Policy, Communications, Finance, HR, Legal, and other core business functions.',
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Our Key Functions</h1>
          <p>
            These key functions work closely together across JV's US-centric area of focus,
            tackling challenging, high-stakes problems and building new capabilities on the
            foundation of a mature platform.
          </p>
        </div>
      </section>

      <div className="container team-grid">
        {TEAMS.map((team) => (
          <div className="team-card" key={team.slug}>
            <h3>{team.name}</h3>
            <p>{team.desc}</p>
          </div>
        ))}
      </div>

      <ExploreRolesCTA />

      <Footer />
    </>
  );
}
