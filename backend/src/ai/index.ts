import type { Types } from "mongoose"
import { fetchTranscript } from "youtube-transcript-plus"
import { Pinecone } from "@pinecone-database/pinecone"
import { PINECONE_KEY } from "../config.js"


type Post = "Youtube" | "Twitter"

export async function convertPosttoVector(title: string, description: string, link: string, type: Post, _id: Types.ObjectId) {
    if (PINECONE_KEY) {

        const pc = new Pinecone({
            apiKey: PINECONE_KEY
        })
        const indexName = 'shimmering-walnut'
        const index = pc.index({ name: indexName });

        const namespace = index.namespace("__default__")

        switch (type) {
            case "Youtube":
                const summary = await youtubeToText(link)
                const text = `Title ${title} \n Description ${description} \n Summary ${summary}`
                await namespace.upsertRecords({
                    records: [
                        {
                            _id: _id.toString(),
                            text
                        }
                    ]
                })
        }
    }
}



async function youtubeToText(link: string): Promise<String> {
    const result = await fetchTranscript(link)
    const allText = result.map(item => item.text).join(" ")

    return allText
}