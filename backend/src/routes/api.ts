import { Router } from "express";
import inputMiddleware from "../middleware/inputMiddleware.js";
import { Content, Links, User } from "../db.js";
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { authMiddleware } from "../middleware/authMiddleware.js";
import * as crypto from 'crypto'


const apiRouter: Router = Router();

apiRouter.post('/v1/signup', inputMiddleware, async (req, res) => {
    const { username, password } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 12)

        if (!hashedPassword)
            throw "Unable to hash password"

        const userCreated = await User.create({ username, password: hashedPassword })
        if (!userCreated)
            throw "Error"
        if (!JWT_SECRET)
            throw "Error in JWT_SECRET"

        const token = jwt.sign({ _id: userCreated._id }, JWT_SECRET)

        return res.status(200).send({ message: "Signup successful", token, user: { _id: userCreated._id, username } })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Unable to create account" })
    }
})


apiRouter.post('/v1/login', inputMiddleware, async (req, res) => {
    const { username, password } = req.body

    try {
        const currentUser = await User.findOne({ username });

        if (!currentUser) {
            console.log("User does not exist")
            return res.status(400).send({ message: "Invalid credentials" })
        }

        const checkPassword = await bcrypt.compare(password, currentUser.password)

        if (!checkPassword) {
            console.log("Password does not match")
            return res.status(400).send({ message: "Invalid credentials" }

            )
        }
        if (!JWT_SECRET)
            throw "Unable to get JWT_SECRET"

        const token = jwt.sign({ _id: currentUser._id }, JWT_SECRET)
        return res.status(200).send({ message: "Login successful", token, user: { username, _id: currentUser._id } })


    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Unable to login" })
    }
})

apiRouter.post('/v1/content', authMiddleware, async (req, res) => {
    const currentUser = await User.findById(req.userId)
    if (!currentUser)
        return res.status(400).send({ message: "user not found" })

    const { title, link, tags, type } = req.body

    if (!title || !link || !tags || !type)
        return res.status(400).send({ message: "Content not valid" })

    const latestContent = await Content.create({ title, link, tags, type, userId: req.userId })
    if (!latestContent)
        return res.status(500).send({ message: "Unable to add content" })

    res.status(200).send({ message: "Content added succuessfully", content: latestContent })
})

apiRouter.delete('/v1/content', authMiddleware, async (req, res) => {
    const { contentId } = req.body

    const currentContent = await Content.find({ _id: contentId, userId: req.userId })

    if (!currentContent || currentContent.length == 0)
        return res.status(400).send({ message: "content id does not exist" })

    try {
        await Content.findByIdAndDelete(contentId)
        return res.status(200).send({ message: "Deletion successful" })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Unable to delete content" })
    }
})

apiRouter.get("/v1/content", authMiddleware, async (req, res) => {
    try {
        const getAllContent = await Content.find({ userId: req.userId })
        return res.status(200).send({ message: "Retrival successful", content: getAllContent })

    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Unable to retrive data" })
    }
})

apiRouter.post("/v1/content/share", authMiddleware, async (req, res) => {
    const { share } = req.body
    if (share === null || share === undefined)
        return res.status(400).send({ message: "share not valid" })
    try {

        if (share) {

            const currentUserLink = await Links.findOne({ userId: req.userId })

            const hash = currentUserLink ? currentUserLink.hash : generateHash(req.username as string)
            if (!currentUserLink) {
                try {
                    await Links.create({ hash, userId: req.userId, share })
                } catch (e) {
                    console.log(e)
                    return res.status(500).send({ message: "Unable to update db" })
                }
            } else {
                const checkUpdate = await Links.findOneAndUpdate({ userId: req.userId }, { share })
            }


            return res.status(200).send({ message: "now you share your contents", link: hash })
        } else {

            const checkUpdate = await Links.findOneAndUpdate({ userId: req.userId }, { share })
            console.log(checkUpdate)
            return res.status(200).send({ message: "your contents are private" })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "unable to update database" })
    }
})


apiRouter.get("/v1/content/:shareLink", authMiddleware, async (req, res) => {
    const hash = req.params.shareLink as string
    const currentUserLink = await Links.findOne({ hash })
    if (!currentUserLink || !currentUserLink.share)
        return res.status(400).send({ message: "Not authorized" })

    const content = await Content.find({ userId: currentUserLink.userId })
    if (!content)
        return res.status(500).send({ message: "Unable to get content" })
    return res.status(200).send({ message: "Content retrieval successful", content })
})


function generateHash(value: string) {
    const salt = crypto.randomBytes(16).toString('hex'); // 16 bytes = 32 hex chars

    // 2. Derive the key using PBKDF2 (Password-Based Key Derivation Function 2)
    const hashBuffer = crypto.pbkdf2Sync(
        value,
        salt,
        100,
        16,
        'sha512'
    );

    // 3. Store the salt and the hash in the database
    return hashBuffer.toString('hex')
}


export default apiRouter;