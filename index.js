import express from "express";
import dotenv from "dotenv"; 
import db from "./db.js"; 
import Character from "./models/characterModel.js"; 

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const characters = await Character.find(); 
    res.render("home", { characters }); 
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/character", async (req, res) => {
  const id = req.query.id; 

  try {
    const character = await Character.findById(id); 
    if (character) {
      res.render("detail", { character }); 
    } else {
      res.status(404).send("<h1>404 Not Found</h1><p>Character not found.</p>");
    }
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/character", async (req, res) => {
  const id = req.query.id; 

  try {
    const result = await Character.findByIdAndDelete(id); 
    if (result) {
      res.status(200).send({ success: true, message: "Character deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Character not found" });
    }
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});