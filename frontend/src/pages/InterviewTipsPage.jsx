import Footer from '../components/Footer.jsx';
import ExploreRolesCTA from '../components/ExploreRolesCTA.jsx';

const INTERVIEW_ITEMS = [
  {
    icon: 'https://cdn.sanity.io/images/sq5fussn/production/f83620c0114411de0c6efd99efeb662a4b1f1ab3-417x301.png?auto=format&fit=max&w=64',
    text: 'Learn more about TikTok USDS Joint Venture. Be ready to tell us why you want to join.',
  },
  {
    icon: 'https://sf16-sg.tiktokcdn.com/obj/eden-sg/0eh7lpquhpanuhf/overseaCMSAssets/images/54d643187b5b45d649c391c4dbd37eb61ae513f5-288x345.png',
    text: 'Familiarize yourself with the job description.',
  },
  {
    icon: 'https://sf16-sg.tiktokcdn.com/obj/eden-sg/0eh7lpquhpanuhf/overseaCMSAssets/images/c0002aba961aef2289a8787585b19d77dfc2c40a-396x391.png',
    text: 'Be prepared to speak about your background and related experiences.',
  },
  {
    icon: 'https://cdn.sanity.io/images/sq5fussn/production/d782a3a19d70e0d4a7c975c7d8da34c4ce984b27-480x344.png?auto=format&fit=max&w=64',
    text: 'Research the news, trends, competitors, history, and opportunities of the organization and its job sector.',
  },
];

const ASSESSMENT_ITEMS = [
  {
    icon: 'https://cdn.sanity.io/images/sq5fussn/production/54cc6d4db1069048173952ae5c48e82aee9f754a-412x480.png?auto=format&fit=max&w=64',
    text: 'Get your thoughts and ideas across during the exercises. Others may also participate in the assessment, so be sure to give them space to speak.',
  },
  {
    icon: 'https://sf16-sg.tiktokcdn.com/obj/eden-sg/0eh7lpquhpanuhf/overseaCMSAssets/images/d0de2c0b74c3c1b97414306dda05a83df5c717ef-360x360.png',
    text: "Don't dwell on any mistakes.",
  },
  {
    icon: 'https://cdn.sanity.io/images/sq5fussn/production/2f26691ddcdcfd9800517cd5adff0acdde2c70d5-480x480.png?auto=format&fit=max&w=64',
    text: 'Draw others into group discussions.',
  },
  {
    icon: 'https://cdn.sanity.io/images/sq5fussn/production/06678f8f7a3a6928645a063e92a8f5407a1015a9-348x376.png?auto=format&fit=max&w=64',
    text: 'Ensure you understand each task, brief and overall challenge clearly.',
  },
  {
    icon: 'https://cdn.sanity.io/images/sq5fussn/production/40c67cd76f62596ed231526b1c040f7d3b1d3d63-449x390.png?auto=format&fit=max&w=64',
    text: 'Relax and let your personality shine!',
  },
];

function TipSection({ title, intro, items }) {
  return (
    <div className="tip-section">
      <div className="tip-section-intro">
        <h2>{title}</h2>
        {intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <ul className="tip-section-list">
        {items.map((item) => (
          <li key={item.text}>
            <img className="tip-icon" src={item.icon} alt="" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InterviewTipsPage() {
  return (
    <>
      <section className="tip-hero">
        <div className="container tip-hero-inner">
          <div className="tip-hero-text">
            <h1>
              Make an
              <br />
              impression
            </h1>
            <p>
              This is an excellent opportunity for you to get to know us better, learn more about the
              role, and let your personality and experience shine!
            </p>
          </div>
        </div>
      </section>

      <div className="container tip-sections">
        <TipSection
          title="How to prepare for your interviews"
          intro={[
            'You should expect to complete several interviews. Here are some tips to keep in mind.',
          ]}
          items={INTERVIEW_ITEMS}
        />
        <TipSection
          title="Preparing for your assessment"
          intro={[
            'You may be invited to participate in an assessment depending on the role and region.',
            'This exercise may be virtual or in person. It combines tasks and activities that allow you to demonstrate your range of skills.',
          ]}
          items={ASSESSMENT_ITEMS}
        />
      </div>

      <ExploreRolesCTA />

      <Footer />
    </>
  );
}
