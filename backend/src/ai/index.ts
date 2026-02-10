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


        try {
            switch (type) {
                case "Youtube": {
                    const summary = await youtubeToText(link)
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

            return () => {
                pc.deleteIndex(indexName)
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
        const indexName = 'shimmering-walnut'
        const index = pc.index({ name: indexName });


        try {
            const results = await index.searchRecords({
                query: {
                    topK: 5,
                    inputs: { text: query }
                }
            })

            const postIds = results.result.hits.map(hit => hit._id)


            pc.deleteIndex(indexName)
            return postIds;
        } catch (e) {
            console.log(e)
        }

    }
}

async function youtubeToText(link: string): Promise<String> {
    const result = await fetchTranscript(link)
    const allText = result.map(item => item.text).join(" ")

    return allText
}