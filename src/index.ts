import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./db";  // Import new MongoDB connection function
import Character from "./models/characterModel";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// Ensure MongoDB connects before Express starts
connectDB().then(() => {
  console.log("✅ MongoDB Connected. Starting Server...");
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error("❌ Failed to start server due to database error:", error);
});

// =========================
// 🌟 API Routes Below 🌟
// =========================

// Home Page - Render Characters
app.get("/", async (req: Request, res: Response) => {
  try {
    const characters = await Character.find();
    res.render("home", { characters: JSON.stringify(characters) });
  } catch (error) {
    console.error("❌ Error fetching characters:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get All Characters
app.get("/api/characters", async (req: Request, res: Response) => {
  try {
    const characters = await Character.find();
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    console.error("❌ Error fetching characters:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get a Character by ID
app.get("/api/characters/:id", async (req: Request, res: Response) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      res.status(200).json({ success: true, data: character });
    } else {
      res.status(404).json({ success: false, message: "Character not found." });
    }
  } catch (error) {
    console.error("❌ Error fetching character:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Add or Update a Character
app.post("/api/characters", async (req: Request, res: Response) => {
  const { id, name, race, weapon, age } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required." });
  }

  try {
    let character;
    if (id) {
      character = await Character.findByIdAndUpdate(
        id,
        { name, race, weapon, age },
        { new: true, upsert: true }
      );
      res.status(200).json({ success: true, message: "Character updated", data: character });
    } else {
      character = new Character({ name, race, weapon, age });
      await character.save();
      res.status(201).json({ success: true, message: "Character added", data: character });
    }
  } catch (error) {
    console.error("❌ Error adding/updating character:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete a Character
app.delete("/api/characters/:id", async (req: Request, res: Response) => {
  try {
    const result = await Character.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ success: true, message: "Character deleted" });
    } else {
      res.status(404).json({ success: false, message: "Character not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting character:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
});

