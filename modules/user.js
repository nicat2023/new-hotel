import {model, Schema} from "mongoose";
const userSchema = new Schema({
        firstName: {
         type : String,
         required:true
        },
        lastName:{
            type : String,
            required:true
        },
        email:{
            type : String,
            required:true
        },
        password:{
            type : String,
            required:true
        },
        role:{
            type : String,
            default:'user'
        },

},{versionKey:false})

 const userModel=model('user',userSchema)
export default userModel