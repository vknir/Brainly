import mongoose, {Schema } from "mongoose";


const tagsSchema =  new Schema({
    title : {type : String, required:true}
})

const Tags = mongoose.model('Tags', tagsSchema)
export default Tags
