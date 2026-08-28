import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer.jsx';

const HERO_IMG =
  'https://cdn.sanity.io/images/sq5fussn/production/960820b18b5eaf8f3a647ec5b44e589d3ae0420a-1030x401.png?auto=format&fit=max&w=3840';

const FAQ_DATA = [
  {
    key: 'general',
    title: 'General Information',
    items: [
      {
        q: "What's the working culture like?",
        a: [
          'TikTok is committed to championing diversity and fostering a culture of inclusion among our global teams. At TikTok, our mission is to inspire creativity and bring joy. To achieve that goal, we are committed to celebrating the diverse voices among us and building an organization that reflects the diversity of our in-app communities. We believe individuals should not be marginalized because of their background or identity, but instead be considered based on their strengths and experience.',
        ],
      },
      {
        q: 'Where are your offices, and where can I work?',
        a: [
          'TikTok has global offices in many cities, including Los Angeles, New York, London, Paris, Berlin, Dubai, Singapore, Jakarta, Seoul, and Tokyo. For more information, please visit our jobs page.',
        ],
      },
      {
        q: 'Do you have any early careers positions? How can I apply and when?',
        a: ['Yes, we provide many early careers opportunities. Please check out our Students & Grads page.'],
      },
      {
        q: 'Do you hire contractors / third-party associates?',
        a: [
          'In some cases, we may offer a fixed term contract for the positions we have posted on our careers site. Roles and requirements vary by region and we do typically hire third party associates via our contracted vendors.',
        ],
      },
      {
        q: 'Do you offer relocation support?',
        a: [
          "It's discussed case by case, but we do provide relocation support for those who need to relocate based on the location of the role. We recommend that you check in on this should the application process proceeds.",
        ],
      },
      {
        q: 'Do I need work authorization for my position?',
        a: ['Yes, candidates are required to have work authorization for the country they are applying for.'],
      },
      {
        q: 'Do you offer VISA sponsorship?',
        a: [
          "There are jobs where the company may be able to offer sponsorship, depending on the requirements of the job and qualifications of the candidate. If the role is appropriate for visa sponsorship and you're qualified for the job, the recruiter will inform you how to proceed with the interview process.",
        ],
      },
      {
        q: 'Can I work remotely?',
        a: [
          'It varies by region and depends on the specific job requirements. You may apply first and further communicate with HR during the interview process.',
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
          'No, we do not require a cover letter in the application process. However, creating a cover letter can be a useful exercise to develop your skills. It may be useful to bring up anything that would not be evident from the rest of your application.',
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
        a: ['A pdf file is highly recommended. We also accept doc, docx, ppt, pptx, png, jpg and jpeg.'],
      },
      {
        q: 'What language do you require for my CV/resume?',
        a: [
          'As we have interviewers that could be located in different parts of the world, English is the preferred language for your CV/resume.',
        ],
      },
      {
        q: 'Can I update my CV/resume after submitting my application?',
        a: ['Yes, you can update your CV/resume under "My resume" by logging onto our careers website.'],
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
          'Any vacancies we have are posted on our jobs page. Please select your desired job category and/or location and the list would appear so please click each job title for more details. To apply, candidates need to create an account on our careers site, using one of the log in options we provide.',
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
          "Generally no, if a job is published on our careers site, it's open for applications. For early careers, there might be application deadlines. Please check out the details in our Students & Grads page.",
        ],
      },
      {
        q: 'How many jobs am I allowed to apply for?',
        a: [
          'While you can apply for multiple positions, we recommend you take a targeted approach selecting only the opportunities most relevant for your skillset.',
          'For early careers, you may only apply for up to two positions within the application time frame. Please check out the details here.',
        ],
      },
      {
        q: 'I interviewed/applied for a job last year, may I reapply?',
        a: [
          'Yes, we generally recommend a 6-month gap between applications for the same role. New positions are continually being created, so please check our jobs page at regular intervals for new roles.',
        ],
      },
      {
        q: 'How can I check my application status?',
        a: [
          'Due to the high volume of applications, we are unable to respond to every applicant. You can check your application status under "My applications" after logging in to our careers website. If HR considers your profile a good fit, they will reach out to you.',
          'Please note that applications made through third-party job platforms will not be shown under "My applications" on our careers site.',
        ],
      },
      {
        q: 'What should I do if I face technical difficulties when submitting my applications on careers site?',
        a: [
          "It may be a network hiccup that can be addressed by refreshing your browser or resetting your phone for better internet or reception coverage. If these steps don't help, please reach out to website-support@tiktok.com.",
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
          'The interview process varies depending on the team and the role. It is common for an assessment, test, or task (usually for technical roles) to be part of the process as well as 3-5 rounds of interviews. Your recruiter will inform you of the specific process for the role you have applied for.',
        ],
      },
      {
        q: 'How do I prepare for an interview?',
        a: [
          'Interviews may vary depending on the team and the role. Our interview tips for students and fresh graduates might also be helpful for you.',
        ],
      },
      {
        q: 'Can I change my interview schedule?',
        a: [
          "Changing your interview time could cause a delay in the process, so please attend when you are scheduled if possible. But we do understand things happen! Please notify your HR ahead of time if that's the case and you need to reschedule.",
        ],
      },
      {
        q: 'What should I wear for the interview?',
        a: [
          'We care more about your ability to perform the job rather than how you dress. Please feel at ease to wear whatever you feel comfortable. We have an inclusive environment!',
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
          'Most of our interviews take place on a rolling basis. From submitting your resume to receiving an offer, the recruiting process lasts one month in most cases. There are, of course, exceptions which could mean we are sometimes a bit longer or even quicker.',
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
          'Due to the high volume of applications, we are unable to respond to every applicant. If you are already in the interview process, you will receive a call or notification from your recruiter notifying you that you have not been selected.',
        ],
      },
      {
        q: "I've received the candidate survey. Does that mean I am or am not selected?",
        a: [
          "Receiving the candidate survey is not indicative of the status of your recruitment process. In order to keep improving our candidate experience, it's important for us to receive feedback from all applicants.",
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
      <div className="faq-hero" style={{ backgroundImage: `url("${HERO_IMG}")` }}>
        <span className="faq-hero-title">FAQ</span>
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
