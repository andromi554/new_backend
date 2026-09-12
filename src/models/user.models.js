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
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"
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



userSchema.pre("save",async function(next){
    
    if(this.modified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })

}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

//mongoose i wann creat a model , a structure in my data bse
//ans the Schemma whihh is followe dby the model is the structure 
//ans that will be called "User"----v
export const User = mongoose.model("User",userSchema);//referss to the userSchema above
