import mongoose from "mongoose";
import dotenv from "dotenv";
import Character from "./models/characterModel.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  tlsInsecure: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Connection error:", err.message);
    process.exit(1);
  })

const characters = [
  { name: "Frodo Baggins", race: "Hobbit", weapon: "String", age: 50 },
  { name: "Aragorn", race: "Human", weapon: "Andúril", age: 87 },
  { name: "Legolas", race: "Elf", weapon: "Bow and Arrow", age: 2931 },
  { name: "Gimli", race: "Dwarf", weapon: "Axe", age: 139 },
  { name: "Gandalf", race: "Maia", weapon: "Staff", age: "Immortal" },
];

Character.insertMany(characters)
  .then(() => {
    console.log("Characters added successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error adding characters:", err);
  });