import mongoose from "mongoose";

const SavedComicSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  comics: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedComic = mongoose.model("SavedComic", SavedComicSchema);

export default SavedComic;
