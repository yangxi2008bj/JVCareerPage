import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const JOBS = '/';
const INTERVIEW_TIPS = '/usds/hiring-process/interview-tips';

const FAQ_DATA = [
  {
    key: 'general',
    title: 'General Information',
    items: [
      {
        q: 'Where are your offices, and where can I work?',
        a: [
          <>
            TikTok USDS Joint Venture has offices in cities around the world, including Los Angeles,
            New York, London, and Sydney. Please visit our <Link to={JOBS}>jobs page</Link> to see
            each location's openings.
          </>,
        ],
      },
      {
        q: 'Do you have any early career positions? How can I apply and when?',
        a: [
          <>
            Yes, we provide many early career opportunities. Please check out our{' '}
            <Link to={JOBS}>jobs page</Link>.
          </>,
        ],
      },
      {
        q: 'Do you offer relocation support?',
        a: [
          'We evaluate relocation support on a case-by-case basis and only provide it when the role requires it. We encourage you to discuss this with your recruiter as the process moves forward.',
        ],
      },
      {
        q: 'Do I need work authorization for my position?',
        a: ["Yes, candidates must have work authorization in the country they're applying."],
      },
      {
        q: 'Do you offer visa sponsorship?',
        a: [
          "Some roles may be eligible for sponsorship, depending on the position's requirements and the candidate's qualifications. If the role qualifies and you're a strong fit, your recruiter will explain how to proceed.",
        ],
      },
    ],
  },
  {
    key: 'cv',
    title: 'About CV/resume',
    items: [
      {
        q: 'Do you require a cover letter?',
        a: [
          'No, we do not require a cover letter in the application process. However, writing one can be a helpful way to highlight anything not already evident in your application.',
        ],
      },
      {
        q: 'How long should my CV/resume be? What information should I include?',
        a: [
          'Please keep your CV/resume concise and specific, include your recent and relevant experience, and highlight examples of leadership, creativity, and innovation.',
        ],
      },
      {
        q: 'What file format do you require for my CV/resume?',
        a: [
          'A .pdf file is highly recommended. We also accept .doc, .docx, .ppt, .pptx, .html, .png, .jpg and .jpeg.',
        ],
      },
      {
        q: 'What language do you require for my CV/resume?',
        a: [
          'Since our interviewers are based around the world, English is the preferred language for your CV/resume.',
        ],
      },
      {
        q: 'Can I update my CV/resume after submitting my application?',
        a: [
          'Yes, you can update your CV/resume under "My resume" by logging into our careers website.',
        ],
      },
    ],
  },
  {
    key: 'application',
    title: 'The application process',
    items: [
      {
        q: 'Where can I find the vacancies?',
        a: [
          <>
            Any vacancies we have are posted on our <Link to={JOBS}>jobs page</Link>. Select your
            desired job category and/or location to see the matching openings, and click each job
            title for more details. To apply, candidates need to create an account on our careers
            site using one of the login options we provide.
          </>,
        ],
      },
      {
        q: 'Where can I submit my application? Can I apply by email?',
        a: [
          'To ensure that all applications are fairly assessed, we encourage you to apply through our careers site. We do not accept email applications as we cannot guarantee a prompt response due to the high volume of applications.',
        ],
      },
      {
        q: 'Is there an application deadline?',
        a: [
          <>
            Generally, no. If a job is published on our careers site, it's open for applications. For
            early careers, there may be application deadlines. Please check out the details on our{' '}
            <Link to={JOBS}>jobs page</Link>.
          </>,
        ],
      },
      {
        q: 'How many jobs am I allowed to apply for?',
        a: [
          'While you can apply for multiple positions, we recommend you take a targeted approach and select only the opportunities most relevant for your skill set.',
        ],
      },
      {
        q: 'I interviewed/applied for a job last year, may I reapply?',
        a: [
          <>
            Yes, we generally recommend a 6-month gap between applications for the same role. New
            positions are continually being created, so please check our{' '}
            <Link to={JOBS}>jobs page</Link> regularly.
          </>,
        ],
      },
      {
        q: 'How can I check my application status? Will you inform me if it changes?',
        a: [
          'Due to the high volume of applications, we are unable to respond to every applicant. You can check your application status under "My applications" after logging in to our careers website. If HR considers your profile a good fit, they will reach out to you.',
          'Please note that applications made through third-party job platforms will not be shown under "My applications" on our careers site.',
        ],
      },
      {
        q: 'What should I do if I face technical difficulties when submitting my applications on the careers site?',
        a: [
          <>
            It may be a network hiccup that can be addressed by refreshing your browser or moving to
            a location with a stronger internet connection. If these steps don't help, please reach
            out to{' '}
            <a href="mailto:website-support@tiktokusds.com">website-support@tiktokusds.com</a>.
          </>,
        ],
      },
    ],
  },
  {
    key: 'interview',
    title: 'The interview process',
    items: [
      {
        q: 'What does the interview process include? Are there any psychometric or technical tests?',
        a: [
          'The interview process varies depending on the team and the role. The process commonly includes 3-5 rounds of interviews, and often an assessment, test, or task (usually for technical roles). Your recruiter will inform you of the specific process for the role you have applied for.',
        ],
      },
      {
        q: 'How do I prepare for an interview?',
        a: [
          <>
            Interviews may vary depending on the team and the role. Our{' '}
            <Link to={INTERVIEW_TIPS}>interview tips</Link> for students and fresh graduates might
            also be helpful for you.
          </>,
        ],
      },
      {
        q: 'Can I change my interview schedule?',
        a: [
          'Changing your interview time could cause a delay in the process, so please show up when you are scheduled, if possible. We do understand things happen. Please notify your recruiter ahead of time if you need to reschedule.',
        ],
      },
      {
        q: 'What should I wear for the interview?',
        a: [
          'We care more about your ability to perform the job than how you dress. Please feel free to wear whatever makes you feel comfortable.',
        ],
      },
      {
        q: 'How do I make an accessibility request?',
        a: [
          'We have a team dedicated to making sure you have the accommodations you need to interview. If you need us to arrange an ASL interpreter or if you have something else in mind, please ask your recruiter to connect you to the interview accommodations team. You can then confidentially discuss your accommodation options with a trained specialist.',
        ],
      },
      {
        q: 'What is the timeline for interviews?',
        a: [
          'Most of our interviews take place on a rolling basis. From submitting your resume to receiving an offer, the recruiting process lasts one month in most cases. Naturally, there are exceptions that can make the process a little longer, or even quicker.',
        ],
      },
      {
        q: "An employee has referred me but I haven't heard back, what should I do?",
        a: [
          'You can check your application status under "My applications" after logging in to our careers website.',
          'You may also contact the employee who referred you. They are able to check their referral status through our internal portal.',
        ],
      },
      {
        q: 'Will you inform me if I am not selected?',
        a: [
          'Due to the high volume of applications, we are unable to respond to every applicant. If you are already in the interview process, your recruiter will contact you with an update on your status.',
        ],
      },
      {
        q: "I've received the candidate survey. Does that mean I am or am not selected?",
        a: [
          "Receiving the candidate survey does not indicate the status of your application. To keep improving our candidate experience, it's important for us to receive feedback from all applicants.",
        ],
      },
    ],
  },
];

export default function FaqPage() {
  const [active, setActive] = useState('general');
  const sectionRefs = useRef({});

  const scrollTo = (key) => {
    const el = sectionRefs.current[key];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      let current = FAQ_DATA[0].key;
      for (const cat of FAQ_DATA) {
        const el = sectionRefs.current[cat.key];
        if (el && el.getBoundingClientRect().top <= 140) current = cat.key;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="faq-hero">
        <span className="faq-hero-title">Frequently Asked Questions</span>
      </div>

      <div className="faq-page">
        <div className="container faq-layout">
          <aside className="faq-sidebar">
            {FAQ_DATA.map((cat) => (
              <button
                key={cat.key}
                className={`faq-nav ${active === cat.key ? 'active' : ''}`}
                onClick={() => scrollTo(cat.key)}
              >
                {cat.title}
              </button>
            ))}
          </aside>

          <div className="faq-content">
            {FAQ_DATA.map((cat) => (
              <section
                key={cat.key}
                className="faq-card"
                ref={(el) => (sectionRefs.current[cat.key] = el)}
              >
                <h2 className="faq-card-title">{cat.title}</h2>
                {cat.items.map((item, i) => (
                  <div className="faq-qa" key={i}>
                    <h4 className="faq-q">{item.q}</h4>
                    {item.a.map((p, j) => (
                      <p className="faq-a" key={j}>
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
