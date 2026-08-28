import { useEffect, useState } from 'react';
import Footer from '../components/Footer.jsx';
import { getNews } from '../api.js';

export default function NewsroomPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews()
      .then((d) => setNews(d.news))
      .catch(() => {});
  }, []);

  const featured = news.find((n) => n.featured) || news[0];
  const rest = news.filter((n) => n !== featured);

  return (
    <>
      <section className="newsroom-head">
        <div className="container">
          <h1>Newsroom</h1>
          <p>The latest news, updates and announcements from TikTok USDS Joint Venture.</p>
        </div>
      </section>

      <div className="container newsroom-body">
        {featured && (
          <a className="news-featured" href="#" onClick={(e) => e.preventDefault()}>
            <div className="news-featured-img">
              <img src={featured.image} alt="" loading="lazy" />
            </div>
            <div className="news-featured-text">
              <div className="news-meta">
                {featured.date} • {featured.tags.join(', ')}
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="read-more">Read More</span>
            </div>
          </a>
        )}

        <div className="news-grid">
          {rest.map((item) => (
            <a
              className="news-card"
              href="#"
              key={item.id}
              onClick={(e) => e.preventDefault()}
            >
              <div className="news-card-img">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <div className="news-card-body">
                <div className="news-meta">
                  {item.date} • {item.tags.join(', ')}
                </div>
                <h3>{item.title}</h3>
                <span className="read-more">Read More</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
