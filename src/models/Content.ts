import mongoose from "mongoose";
import User from "./User.ts";
import Tags from "./Tags.ts";

const categoryList = ["audio", "video", "article", "image"];

interface IBookmark {
    link: string;          // include link here
    category: string;
    title: string;
    tags: mongoose.Schema.Types.ObjectId[]; // if tags are ObjectId references
    userId: mongoose.Schema.Types.ObjectId; // actual ObjectId type, NOT query type
}

const contentSchema = new mongoose.Schema<IBookmark>({
    link: { type: String, required: true },
    category: { type: String, enum: categoryList, required: true },
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required:true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: Tags }]
})

const Content = mongoose.model('Content', contentSchema)

export default Content