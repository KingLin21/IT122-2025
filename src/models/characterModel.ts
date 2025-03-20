import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: String,
  race: String,
  weapon: String,
  age: Number,
});

// Make sure the collection name is correct
const Character = mongoose.model("Character", characterSchema, "characters");

export default Character;
