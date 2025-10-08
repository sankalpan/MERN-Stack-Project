const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

router.get("/news/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await response.json();

    if (!data.articles) {
      return res.status(500).json({ message: "No articles found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Server error while fetching news" });
  }
});

module.exports = router;
