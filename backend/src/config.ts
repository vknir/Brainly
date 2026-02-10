import 'dotenv/config'

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET
const PINECONE_KEY = process.env.PINECONE_KEY

export { PORT, MONGO_URI, JWT_SECRET, PINECONE_KEY }