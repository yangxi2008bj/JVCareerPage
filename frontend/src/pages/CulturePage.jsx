import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import ExploreRolesCTA from '../components/ExploreRolesCTA.jsx';

const BYTESTYLE = [
  {
    title: 'Always Day 1',
    bullets: [
      'Always maintain an entrepreneurial mindset. Keep pioneering and innovating instead of relying on resources or past achievements.',
      'Stay agile and pursue efficiency and simplicity. Reduce unnecessary procedures.',
      'Reject complacency. Stay open and humble.',
    ],
  },
  {
    title: 'Champion Diversity and Inclusion',
    bullets: [
      "Value individual differences, and focus on people's unique strengths.",
      'Think global. Understand and celebrate different cultures, views, and experiences.',
      'Facilitate effective collaboration by assuming good intent and trusting by default.',
    ],
  },
  {
    title: 'Be Candid and Clear',
    bullets: [
      'Speak your mind. Expose problems candidly. Avoid "managing up".',
      'Be accurate, concise, and straightforward. Avoid overusing jargon or elaborate terms.',
      'Drive communication and form conclusions with data and facts, instead of assumptions or emotions.',
    ],
  },
  {
    title: 'Seek Truth and Be Pragmatic',
    bullets: [
      'Be an independent thinker. Get to the bottom of things. Distill ideas down to their fundamental truths.',
      'Dive deep into facts. Seek direct experience and first-hand data and information.',
      'Be grounded and focus on real impact.',
    ],
  },
  {
    title: 'Be Courageous and Aim for the Highest',
    bullets: [
      'Dare to take calculated risks for bigger gains, with a focus on return on investment.',
      'Explore alternative solutions in a larger scope for the optimal result.',
      "Insist on high standards. Don't just get the job done; execute with excellence.",
    ],
  },
  {
    title: 'Grow Together',
    bullets: [
      'Live and be driven by our mission and vision.',
      'Show patience and resilience in the face of short-term fluctuations. Solve problems together.',
      'Keep learning and keep pushing boundaries. Pursue mutual growth with the organization.',
    ],
  },
];

const LEADERSHIP = [
  {
    title: 'Be Mission and Vision Driven, and Focus on Meaningful Breakthroughs',
    bullets: [
      'Think big, bold, and ambitiously to inspire others in pursuit of our mission.',
      'Keep our vision in mind when developing strategies. Focus on meaningful breakthroughs. Break industry boundaries through innovation.',
      'Value the fundamentals, ensure solid work, and pursue long-term impact.',
    ],
  },
  {
    title: 'Set Ambitious Goals, Be Resilient, and Achieve Results',
    bullets: [
      'Set ambitious, challenging goals and break through self-imposed limits.',
      'Continually set a high bar for the team and pursue industry-leading standards.',
      'Lead teams with resilience and a willingness to tackle challenges, while consistently achieving strong results.',
    ],
  },
  {
    title: 'Have Sound Judgement in Complex Situations',
    bullets: [
      'Get to the root of problems and seek critical improvement.',
      'Be clear and firm when developing conclusions. Steer away from ambiguity.',
      'Thoughtfully consider feedback and different viewpoints, think independently. Do not be overly influenced by internal or external pressures.',
    ],
  },
  {
    title: 'Small Ego, Big Picture',
    bullets: [
      'Avoid titles or honorifics, and de-emphasize hierarchy. Prioritize business needs and show flexibility in reporting lines.',
      'Take ownership of your scope without a territorial mindset, and seek solutions that best serve the bigger picture.',
      'View leadership as a responsibility, not a privilege. Focus on impact and demand more of yourself as you take on bigger and more complex responsibilities.',
    ],
  },
  {
    title: 'Have a Sense of Urgency, and Maintain an External Perspective',
    bullets: [
      'No complacency. Be proactive in pursuing knowledge and understanding external changes, and avoid being confined to internal information.',
      'Avoid self-congratulation. Measure results factoring in both external perspectives and real impact.',
      'Stay focused, and direct resources to our most important goals.',
    ],
  },
  {
    title: 'Be Hands-On',
    bullets: [
      'Seek first-hand information and build a strong basis for judgement.',
      'Remain hands-on whenever needed.',
      'When delegating, maintain ownership of the outcome. Track execution, course-correct early, and be the backstop when needed.',
    ],
  },
  {
    title: 'Context over Control',
    bullets: [
      'Ensure sufficient information and context flow, and avoid information gaps.',
      'Encourage participation from everyone to develop better ideas. Avoid having one voice dominate decision-making, and make decisions based on sufficient information.',
    ],
  },
  {
    title: 'Lead People Based on Their Qualities, and Inspire Growth',
    bullets: [
      'Hire for core capabilities, qualities, and potential, instead of highlights on a resume such as titles or the name recognition of past employers.',
      'Keep strengthening the team. Build a strong talent pipeline. Be open to hiring or developing people more capable than yourself.',
      'Lead without biases or personal preferences. Resist being "managed up" by your team.',
      "Believe in people's potential, develop the team on the job, and provide the right opportunities to grow.",
    ],
  },
  {
    title: 'Manage with Firm Principles',
    bullets: [
      'When solving management problems, be patient, but firm on our principles.',
      'Differentiate rewards based on performance and contributions. Identify and reward strong results generously, while being realistic and honest about underperformance.',
      'Proactively manage low-performance cases in the team, staying lean and efficient.',
    ],
  },
  {
    title: 'Lead by Example, and Own the Team Culture',
    bullets: [
      'Be a role model of ByteStyle through daily actions and be responsible for team culture.',
      'Be fair and trustworthy. Uphold high ethical standards. Create a work environment that promotes simplicity and integrity.',
    ],
  },
];

function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`accordion-item${isOpen ? ' is-open' : ''}`} key={item.title}>
            <button
              type="button"
              className="accordion-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.title}</span>
              <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="accordion-body">
                {item.bullets ? (
                  <ul className="accordion-bullets">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.desc}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CulturePage() {
  return (
    <>
      <section className="philosophy">
        <div className="container philosophy-inner">
          <div className="philosophy-text">
            <h1>Our Ways of Working</h1>
          </div>
        </div>
      </section>

      <section className="culture-body">
        <div className="container culture-body-inner">
          <nav className="culture-nav">
            <a href="#bytestyle">ByteStyle</a>
            <a href="#leadership">Leadership Principles</a>
          </nav>

          <div className="culture-content">
            <div className="culture-panel" id="bytestyle">
              <h2>ByteStyle</h2>
              <Accordion items={BYTESTYLE} defaultOpen={0} />
            </div>

            <div className="culture-panel" id="leadership">
              <h2>Leadership Principles</h2>
              <Accordion items={LEADERSHIP} defaultOpen={0} />
            </div>
          </div>
        </div>
      </section>

      <ExploreRolesCTA />

      <Footer />
    </>
  );
}
