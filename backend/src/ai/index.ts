import type { Types } from "mongoose"
import { fetchTranscript } from "youtube-transcript-plus"
import { Pinecone } from "@pinecone-database/pinecone"
import { PINECONE_KEY, GOOGLE_API_KEY } from "../config.js"
import { GoogleGenAI } from "@google/genai"


type Post = "Youtube" | "Twitter"



export async function convertPosttoVector(title: string, description: string, link: string, type: Post, _id: Types.ObjectId): Promise<void> {

    if (PINECONE_KEY) {
        const pc = new Pinecone({
            apiKey: PINECONE_KEY
        })
        const indexName = 'mediashare'
        const index = pc.index({ name: indexName });

        const namespace = index.namespace("__default__")


        try {
            switch (type) {
                case "Youtube": {
                    const summary = await youtubeToText(link).then(text => summarizeText(text))

                    const text = `Title ${title}
                              Description ${description}
                              Summary ${summary}`
                    await namespace.upsertRecords({
                        records: [
                            {
                                _id: _id.toString(),
                                text
                            }
                        ]
                    })
                    break;
                }
                case "Twitter": {
                    const text = `Title ${title}
                              Description ${description}`
                    await namespace.upsertRecords({
                        records: [
                            {
                                text,
                                _id: _id.toString()
                            }
                        ]
                    })
                }
            }

           
        } catch (e) {
            console.log(e)
        }
    }

}

export async function searchQuerytoGetId(query: string): Promise<string[] | undefined> {
    if (PINECONE_KEY) {
        const pc = new Pinecone({
            apiKey: PINECONE_KEY
        })
        const indexName = 'mediashare'
        const index = pc.index({ name: indexName });
        const namespace = index.namespace("__default__")

        try {

            const results = await namespace.searchRecords({
                query: {
                    topK: 3,
                    inputs: { text: query }
                }
            })

            const postIds = results.result.hits.map(hit => hit._id)


           
            return postIds;
        } catch (e) {
            console.log(e)
        }

    }
}

async function summarizeText(text: string): Promise<string | undefined> {
    if (GOOGLE_API_KEY) {
        const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY })

        const summary = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `provide a concise summary of the following text: 
                        ${text}`
        })

        if (summary)
            return summary.text
    }
}

async function youtubeToText(link: string): Promise<string> {
    const result = await fetchTranscript(link)
    const allText = result.map(item => item.text).join(" ")

    return allText
}