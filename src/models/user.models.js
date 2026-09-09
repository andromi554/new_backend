// things to do in user model:
// id -> string and primary key
// username -> string
// email -> string 
// fullname -> string
// avatar -> string
// coverImage -> string
// watchHistory -> objectId[] videos
// password -> string
// refereshToken ->  string
// createdAt -> Date
// updatedAt -> date


import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim: true,
            index:true
        },
        avatar:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"pasword is required"]

        },
        refershToken:{
            type:String
        },

    },{timestamps:true}
)



//mongoose i wann creat a model , a structure in my data bse
//ans the Schemma whihh is followe dby the model is the structure 
//ans that will be called "User"----v
export const User = mongoose.model("User".userSchema);//referss to the userSchema above
