declare namespace Express {
    export interface Request {
        userId?: mongoose.Schema.Types.ObjectId,
        username?:string
    }
}