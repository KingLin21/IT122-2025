import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Character from "./models/characterModel";

dotenv.config();

const mongoURI: string = process.env.MONGO_URI || "";

mongoose.connect(mongoURI, {
  tlsInsecure: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => {
    console.error("Connection error:", err.message);
    process.exit(1);
  });

type CharacterData = {
  name: string;
  race: string;
  weapon: string;
  age: number | string;
};

const characters: CharacterData[] = [
  { name: "Frodo Baggins", race: "Hobbit", weapon: "Sting", age: 50 },
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
  .catch((err: Error) => {
    console.error("Error adding characters:", err);
  });
