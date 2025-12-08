import express, { Router } from "express";
import inputMiddleware from "../middleware/inputMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.ts";
import { User, Content } from "../config/db.ts"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const apiRouter: Router = express.Router();

apiRouter.post('/v1/signup', inputMiddleware, async (req, res) => {
    const { username, password } = req.body
    try {
        const checkUserName = await User.findOne({ username })
        if (checkUserName) {
            return res.status(403).send({ message: "Username taken" })
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                throw new Error("Error wwhile hashing a password")


            }
            const key = process.env.KEY
            if (!key)
                return res.status(500).send({ message: "Unable to get jwt_secret" })
            const currentUser = await User.create({ username: username, password: hash })
            const token = jwt.sign({ _id: currentUser._id }, key, { expiresIn: '24h' })


            return res.status(200).send({ message: "user created", token, user: { userId: currentUser._id, username } })
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Error while hashing password" })
    }

})

apiRouter.post('/v1/login', inputMiddleware, async (req, res) => {
    const { username, password } = req.body
    try {
        const currentUser = await User.findOne({ username })
        if (!currentUser) {

            return res.status(401).send({ message: "Wrong username or password" })
        } else {
            const checkPassword = await bcrypt.compare(password, currentUser.password)
            if (checkPassword) {
                const key = process.env.JWT_SECRET

                if (!key) {
                    throw new Error("Key does not exist")
                } else {
                    const token = jwt.sign({ _id: currentUser._id }, key, { expiresIn: '24h' })
                    return res.status(200).send({ message: "Login successful", token, user: { id: currentUser._id, username } })
                }



            } else {
                return res.status(401).send({ message: "Wrong username or password" })
            }
        }


    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Unable to find key" })
    }
})

apiRouter.post('/v1/content', authMiddleware, async (req, res) => {
    const { link, category, title }: { link: string, category: string, title: string } = req.body
    if (!link || !category || !title)
        return res.status(400).send({ message: "inputs not valid" })
    const userId = req.userId
    if (!userId)
        return res.status(500).send({ message: "Unable to get userId" })

    const contentPush = await Content.create({ link: link, category: category, title: title, userId: userId })
    if (!contentPush)
        return res.status(500).send({ message: "Unable to push into db" })

    return res.status(200).send({ message: "Update successful" })

})

apiRouter.get('/v1/content', authMiddleware, async (req, res) => {
    const userId = req.userId;
    if (!userId)
        return res.status(500).send({ message: "userid not found" })
    const allContet = await Content.find({ userId })
    return res.status(200).send({ message: "All content fetched", content: allContet })
})

apiRouter.delete('/v1/content', authMiddleware, async (req, res) => {
    const { contentId } = req.body
    if (!contentId)
        return res.status(400).send({ message: "Content id not given" })

    const checkContentId = await Content.findById(contentId)
    if (!checkContentId)
        return res.status(400).send({ message: "Content does not exist" })

    try {
        await Content.findByIdAndDelete(contentId)
        return res.status(200).send({ message: "Content deleted successfully" })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Unable to delete content" })
    }
})

export { apiRouter }