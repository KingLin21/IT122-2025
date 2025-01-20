import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
const PORT = process.env.PORT || 3000; 

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  const characters = getAll();
  res.render("home", { characters });
});

app.get('/about', (req, res) => {
  res.send('<h1>About Me</h1><p>Hi, I am Sebastian Linhart. I am a web development student working on a Node.js project.</p>');
});

app.get("/character", (req, res) => {
  const id = req.query.id;
  const character = getItem(id);

  if (character) {
    res.render("detail", { character })
  } else {
    res.status(404).send("<h1>404 Not Found</h1><p>Character not found.</p>");
  }
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});