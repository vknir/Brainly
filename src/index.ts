import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { apiRouter } from './routes/api.js'


dotenv.config()


const port = process.env.PORT || 3000
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', () => {
    console.log('hello')
})

app.use('/api', apiRouter)


async function main() {
    console.log('hello')
    try {
        await mongoose.connect(process.env.MONGO_URL || "")

        app.listen(port)
    } catch (e) {
        console.log("Unable to connect to db")
    }

}


main();