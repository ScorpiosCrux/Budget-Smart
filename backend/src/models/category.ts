import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  budget: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
