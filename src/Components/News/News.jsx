import React, { useEffect, useState } from 'react';

export const News = () => {
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23");
        const data = await res.json();

        console.log("RESPONS:", data)

        setNews(data.items || []);
      } catch (err) {
        setError(err.message || "Fejl");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-grey/30 backdrop-invert backdrop-opacity-10 border rounded-lg my-1 w-300px">
      <h2 className="text-xl font-bold uppercase m-1">Seneste nyheder</h2>
      <ul>
        {news.slice(0, 5).map((item) => (
          <li key={item.guid} className="m-1">
              <h3 className="text-lg text-black-600 font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{new Date(item.pubDate).toLocaleString()}</p>
            {/* <p>{item.description.replace(/<[^>]+>/g, '')}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
