import mongoose from "mongoose";

const ViewedComicSchema = new mongoose.Schema({
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

const ViewedComic = mongoose.model("ViewedComic", ViewedComicSchema);

export default ViewedComic;
