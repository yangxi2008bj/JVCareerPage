import { useParams, Link, Navigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const img = (prompt) =>
  `https://core-normal.traeapiusds.us/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=landscape_16_9`;

const DEPARTMENTS = {
  rd: {
    name: 'R&D',
    tagline: 'Building the technology that powers a platform for hundreds of millions.',
    image: img(
      'software engineers collaborating around code on large monitors in a modern tech office, whiteboard with system architecture, natural light, candid photography'
    ),
    intro:
      'The Research and Development Team drives our business forward by refining and improving our current products to meet the demands of global users, as well as exploring entirely new innovations for the future.',
    mission:
      'From large-scale distributed systems and machine learning infrastructure to trust & safety and payment platforms, R&D engineers build the reliable, secure, and scalable foundations behind everything we ship.',
    focus: [
      {
        title: 'Infrastructure & Reliability',
        desc: 'Design and operate globally distributed, fault-tolerant systems that keep the platform fast and always available.',
      },
      {
        title: 'Machine Learning & AI',
        desc: 'Develop recommendation, search, and risk-control models, and bring agentic AI into real-world production workflows.',
      },
      {
        title: 'Trust & Safety Engineering',
        desc: 'Build the systems and models that keep hundreds of millions of users safe every single day.',
      },
    ],
  },
  product: {
    name: 'Product',
    tagline: 'Shaping the vision and direction of world-class platforms.',
    image: img(
      'product managers reviewing app mockups and roadmap on a wall of sticky notes in a bright office, diverse team discussion, candid photography'
    ),
    intro:
      'Focusing on innovation and direction, the Product Team investigates, identifies, and guides the success of our world-class platforms. They drive product development and make an impact by analyzing the market, determining the vision and strategy, and collaborating with other teams.',
    mission:
      'Product managers, data scientists, and analysts turn insight into strategy — defining what we build, why it matters, and how it creates value for our global community.',
    focus: [
      {
        title: 'Product Strategy',
        desc: 'Set the vision and roadmap, balancing user needs, market trends, and business goals.',
      },
      {
        title: 'Data Science & Analytics',
        desc: 'Uncover insights from massive datasets to guide decisions across growth, safety, and experience.',
      },
      {
        title: 'Cross-functional Delivery',
        desc: 'Partner with engineering, design, and operations to ship products that reach millions.',
      },
    ],
  },
  design: {
    name: 'Design',
    tagline: 'Crafting experiences that are as beautiful as they are useful.',
    image: img(
      'UX designers working on interface designs on tablets and screens, colorful design system on wall, creative modern studio, candid photography'
    ),
    intro:
      'With incredible creativity and artistic skill, the Design Team shapes the visual representation of our products and businesses. They create unique designs that are not just visually appealing, but also express the aesthetic of our brand.',
    mission:
      'Our designers blend craft and empathy to create intuitive, delightful experiences — from interaction and visual design to research and brand expression.',
    focus: [
      {
        title: 'Product Design',
        desc: 'Design end-to-end experiences that are intuitive, accessible, and a joy to use.',
      },
      {
        title: 'Brand & Visual',
        desc: 'Express the identity and aesthetic of our brand across every touchpoint.',
      },
      {
        title: 'Design Research',
        desc: 'Bring the voice of the user into every decision through research and testing.',
      },
    ],
  },
  marketing: {
    name: 'Marketing',
    tagline: 'Elevating our brand and connecting with communities worldwide.',
    image: img(
      'marketing team brainstorming a campaign with brand assets and analytics dashboards on screens, energetic modern office, candid photography'
    ),
    intro:
      'Combining creativity and market research, the Marketing Team captivates consumers and business partners alike by leading our branding, advertising, communications, and media strategies around the world. They strive to elevate the visibility of our brand globally.',
    mission:
      'From campaigns and communications to media and partnerships, the Marketing Team tells our story and builds meaningful connections with people and businesses everywhere.',
    focus: [
      {
        title: 'Brand & Campaigns',
        desc: 'Craft campaigns that capture attention and communicate what we stand for.',
      },
      {
        title: 'Communications',
        desc: 'Shape our narrative across media, PR, and public-facing channels.',
      },
      {
        title: 'Growth Marketing',
        desc: 'Use research and data to grow our audience and deepen engagement.',
      },
    ],
  },
  'corporate-functions': {
    name: 'Corporate Functions',
    tagline: 'Keeping the organization growing, compliant, and running smoothly.',
    image: img(
      'corporate professionals in a meeting room discussing documents, finance and legal team collaboration, modern glass office, candid photography'
    ),
    intro:
      'The Corporate Functions Team anticipates and addresses organizational problems to ensure that we continue growing and operating efficiently. They provide solutions by combining the resources of Human Resources, Legal & Policy, Finance, and Support.',
    mission:
      'Spanning HR, Legal & Policy, Finance, and Support, Corporate Functions provides the backbone that lets every other team do their best work — responsibly and at scale.',
    focus: [
      {
        title: 'People & HR',
        desc: 'Attract, develop, and support the talent that makes everything possible.',
      },
      {
        title: 'Legal & Policy',
        desc: 'Navigate a complex, regulated environment while protecting the company and its users.',
      },
      {
        title: 'Finance & Support',
        desc: 'Steward resources responsibly and keep operations running efficiently.',
      },
    ],
  },
  operations: {
    name: 'Operations',
    tagline: 'Ensuring quality and delight across everything we deliver.',
    image: img(
      'operations analysts reviewing quality dashboards and metrics on multiple monitors in a modern control room, focused teamwork, candid photography'
    ),
    intro:
      'Utilizing strong analytical abilities, the Operations Team ensures that the quality of our products meets the expectations and needs of our users. They are passionate about using our products to empower and bring joy to our global community.',
    mission:
      'Operations combines analytics, process design, and moderation expertise to protect quality and trust — keeping the marketplace and community safe, reliable, and enjoyable.',
    focus: [
      {
        title: 'Quality & Moderation',
        desc: 'Safeguard content quality and platform integrity across automated and human review.',
      },
      {
        title: 'Process Optimization',
        desc: 'Design and refine the processes that keep operations efficient at scale.',
      },
      {
        title: 'Analytics & Insights',
        desc: 'Turn operational data into actions that improve the user experience.',
      },
    ],
  },
  sales: {
    name: 'Sales',
    tagline: 'Building relationships that connect our products with the world.',
    image: img(
      'sales professionals shaking hands and presenting to business clients in a modern conference room, positive energy, candid photography'
    ),
    intro:
      'Our Sales Team does more than just generate revenue. By building strong relationships and providing a positive customer experience, they create valuable connections between our products/services and our customers.',
    mission:
      'The Sales Team partners closely with customers and businesses to understand their goals and connect them with the right solutions — creating lasting value on both sides.',
    focus: [
      {
        title: 'Client Partnerships',
        desc: 'Build trusted, long-term relationships with businesses and partners.',
      },
      {
        title: 'Solutions & Strategy',
        desc: 'Match customer needs to the right products and drive measurable outcomes.',
      },
      {
        title: 'Customer Experience',
        desc: 'Deliver a positive, high-touch experience at every stage of the journey.',
      },
    ],
  },
};

export default function DepartmentPage() {
  const { slug } = useParams();
  const dept = DEPARTMENTS[slug];

  if (!dept) return <Navigate to="/usds/team" replace />;

  return (
    <>
      <div className="dept-hero" style={{ backgroundImage: `url("${dept.image}")` }}>
        <div className="dept-hero-overlay">
          <div className="container">
            <Link to="/usds/team" className="dept-back">
              ‹ All teams
            </Link>
            <h1>{dept.name}</h1>
            <p>{dept.tagline}</p>
          </div>
        </div>
      </div>

      <section className="dept-intro">
        <div className="container narrow">
          <p>{dept.intro}</p>
          <p>{dept.mission}</p>
        </div>
      </section>

      <section className="dept-focus">
        <div className="container">
          <h2>What we focus on</h2>
          <div className="dept-focus-grid">
            {dept.focus.map((f) => (
              <div className="dept-focus-card" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dept-cta">
        <div className="container narrow">
          <h2>Join the {dept.name} team</h2>
          <p>Explore open roles and find where your skills fit best.</p>
          <Link to="/" className="cta-btn">
            View open roles
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
