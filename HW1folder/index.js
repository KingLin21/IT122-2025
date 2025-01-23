import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to my Home Page</h1><p>This is a simple Node.js server running on Replit.</p>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Me</h1><p>Hi, I am Sebastian Linhart. I am a web development student working on a Node.js project.</p>');
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
