


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

export default function News() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
   



  useEffect(() => {
    const fetchNews = async () => {                                          
      setLoading(true);
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=7c9f55f53f0f4bd691bd2d93cc933349`
        );
        const data = await res.json();
        setArticles(data.articles);
          //add this line new
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category, ]);  

  const saveBookmark = async (article) => {
    if (!token) {
      alert('Please login to bookmark articles.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          author: article.author,
          date: article.publishedAt,
          source: article.source.name
        })
      });

      if (res.ok) {
        alert('Article bookmarked!');
      } else {
        alert('Bookmark failed.');
      }
    } catch (err) {
      console.error("Error bookmarking article", err);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 text-capitalize">{category} News</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100 ">
                <img
                  src={article.urlToImage}
                  className="card-img-top"
                  alt="news"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a
                    href={article.url}
                    className="btn btn-primary mt-auto"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read More
                  </a>

                
                  {token && (
                    <button
                      className="btn btn-outline-secondary btn-sm mt-2"
                      onClick={() => saveBookmark(article)}
                    >
                      🔖 Bookmark
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
