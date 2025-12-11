import type { NextFunction } from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

})




const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User',
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tags' }],
    type: { type: String, required: true }
})


contentSchema.pre('save', async function () {
    const user = await User.findById(this.userId)
    if (!user)
        throw new Error("User does not exist")
})



const tagsSchema = new mongoose.Schema({
    title: { type: String, required: true }
})


const linksSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    share: { type: Boolean, default: false }
})



export const User = mongoose.model('User', userSchema)
export const Content = mongoose.model('Content', contentSchema)
export const Tags = mongoose.model('Tags', tagsSchema)
export const Links = mongoose.model('Links', linksSchema);



