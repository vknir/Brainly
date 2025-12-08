import mongoose, {Schema} from "mongoose"
import User from "./User.ts"

const linkSchema = new Schema({
    hash: {type:String, required:true},
    userId: {type : Schema.Types.ObjectId, ref:User, required:true}
})

const Links = mongoose.model('Links', linkSchema)

export default Links