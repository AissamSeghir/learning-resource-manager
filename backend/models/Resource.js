import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        url: String,
        type: { type: String, enum: ['video', 'article', 'book'], required: true },
        tags: [String],
      }
);

const Resource = mongoose.model("Resource",resourceSchema)

export default Resource
