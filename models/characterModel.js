import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: {type: String, required: true },
  race: {type: String, required: true },
  weapon: {type: String, required: true },
  age: mongoose.Schema.Types.Mixed,
});

const Character = mongoose.model("Character", characterSchema);

export default Character;