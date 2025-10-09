const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const bookmarkRoutes = require("./routes/bookmarks");
const newsRoutes = require("./routes/newsRoutes");

const app = express();
app.use(cors());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow frontend domain
    credentials: true, // allow cookies/auth headers
  })
);
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api", newsRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT || 5000, () => console.log("Server is running!!")))
    .catch(err => console.error(err));
