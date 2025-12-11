import express from 'express'
import { MONGO_URI, PORT } from './config.js';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';

const app = express();

app.listen(PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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