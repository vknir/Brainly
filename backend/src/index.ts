import express from 'express'
import { MONGO_URI, PORT } from './config.js';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';
import cors from 'cors'

const app = express();

app.listen(PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', apiRouter)


async function main() {
    try {
        if (!MONGO_URI)
            throw "MONGO_URI not available"
        await mongoose.connect(MONGO_URI)
    } catch (e) {
        console.log(e)
        return;
    }
}

main()