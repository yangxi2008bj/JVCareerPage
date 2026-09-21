import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const PREPARE_CARDS = [
  {
    title: 'Interview tips',
    linkText: 'Read our helpful advice',
    to: '/usds/hiring-process/interview-tips',
  },
  {
    title: 'Frequently Asked Questions',
    linkText: 'Read our full list of FAQs',
    to: '/usds/hiring-process/faq',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Apply',
    bullets: [
      'As you prepare your application, take some time to explore our platform, mission, company news, and our latest ideas and innovations.',
      'When you are ready, take a look at our career website and apply to the roles that most align with your interests and qualifications.',
      "Your resume is our first introduction into the impact you've made on your past experiences. Ensuring your resume is updated and tailored to the role you are applying for will give us the best understanding of how your experience aligns with the responsibilities and qualifications of our role.",
    ],
  },
  {
    title: 'Interview',
    bullets: [
      'Get to know your recruiter and potential coworkers in a series of phone, video, or onsite interviews.',
    ],
  },
  {
    title: 'Offer',
    bullets: [
      'Accept your job offer and join the TikTok team! This is the start of your exciting career journey with us.',
    ],
  },
];

const FAQ_PREVIEW = [
  {
    q: 'Where are your offices, and where can I work?',
    a: [
      "TikTok USDS JV has offices in cities around the world, including Los Angeles, New York, London, and Sydney. Please visit our jobs page to see each location's openings.",
    ],
  },
  {
    q: 'Do you have any early career positions? How can I apply and when?',
    a: ['Yes, we provide many early career opportunities. Please check out our jobs page.'],
  },
  {
    q: 'Do you offer VISA sponsorship?',
    a: [
      "Some roles may be eligible for sponsorship, depending on the position's requirements and the candidate's qualifications. If the role qualifies and you're a strong fit, your recruiter will explain how to proceed.",
    ],
  },
  {
    q: 'How can I check my application status? Will you inform me if it changes?',
    a: [
      'Due to the high volume of applications, we are unable to respond to every applicant. You can check your application status under "My applications" after logging in to our careers website. If HR considers your profile a good fit, they will reach out to you.',
      'Please note that applications made through third-party job platforms will not be shown under "My applications" on our careers site.',
    ],
  },
];

function ProcessCard({ step }) {
  const [expanded, setExpanded] = useState(false);
  const collapsible = step.bullets.length > 1;
  const visible = collapsible && !expanded ? step.bullets.slice(0, 1) : step.bullets;
  return (
    <div className="process-card">
      <h3 className="process-card-title">{step.title}</h3>
      <ul className="process-card-list">
        {visible.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {collapsible && (
        <button className="process-card-toggle" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

function FaqItem({ item, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`hp-faq-item ${open ? 'open' : ''}`}>
      <button className="hp-faq-q" onClick={() => setOpen((v) => !v)}>
        <span>{item.q}</span>
        <span className="hp-faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open &&
        item.a.map((p, i) => (
          <p className="hp-faq-a" key={i}>
            {p}
          </p>
        ))}
    </div>
  );
}

export default function HiringProcessPage() {
  return (
    <>
      <section className="hp-hero">
        <div className="container">
          <h1>Inspire creativity and grow your career at TikTok USDS JV</h1>
          <p>
            We're excited you've explored our career opportunities and are ready to apply. Learn more
            about the candidate process below.
          </p>
        </div>
      </section>

      <section className="hp-prepare">
        <div className="container hp-prepare-inner">
          <div className="hp-prepare-intro">
            <h2>How to prepare</h2>
            <p>
              As you prepare to submit your application, become familiar with who we are, our culture,
              and our teams through firsthand stories and experiences.
            </p>
          </div>
          <div className="hp-prepare-cards">
            {PREPARE_CARDS.map((card) => (
              <Link className="hp-prepare-card" to={card.to} key={card.title}>
                <div className="hp-prepare-card-body">
                  <h3>{card.title}</h3>
                  <span className="hp-prepare-card-link">{card.linkText}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hp-process">
        <div className="container">
          <h2>Our recruitment process</h2>
          <div className="hp-process-grid">
            {PROCESS_STEPS.map((step) => (
              <ProcessCard step={step} key={step.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="hp-faq">
        <div className="container hp-faq-inner">
          <h2>
            Frequently
            <br />
            asked
            <br />
            questions
          </h2>
          <div className="hp-faq-list">
            {FAQ_PREVIEW.map((item, i) => (
              <FaqItem item={item} key={item.q} defaultOpen={i === 0} />
            ))}
            <Link to="/usds/hiring-process/faq" className="hp-faq-more">
              Read our full list of FAQs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
