import News from '../models/News.js';


import axios from 'axios';

// Create a new news article
export const createNews = async (req, res) => {
  try {
    const { title, description, url, urlToImage, publishedAt, content } = req.body;
    const news = await News.create({ title, description, url, urlToImage, publishedAt, content });
    res.status(201).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all news articles
export const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find();
    res.status(200).json({ success: true, data: newsList });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a specific news article by its ID
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    
    if (!news) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Fetch news articles from the News API and store in the database
export const fetchAndStoreNews = async (req, res) => {
    try {
      const apiKey = '519cb3216a01417bab77e9c3f37fc11c';
      const query = 'sports';
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  
      // Fetch data from the News API
      const response = await axios.get(apiUrl);
  
      // Extract the articles from the response
      const articles = response.data.articles;
  
      // Save each article in the database
      for (const article of articles) {
        // Check if the article already exists in the database by using the "url" as a unique identifier
        const existingArticle = await News.findOne({ url: article.url });
  
        if (!existingArticle) {
          // Create a new News document if the article does not exist in the database
          await News.create(article);
        }
      }
  
      res.status(200).json({ success: true, message: 'News articles fetched and stored successfully!' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

