import mongoose,{connect} from "mongoose";
import express from "express";
import userRouter from './routers/user.js'
import adminRouter from './routers/admin.js'
import UserauthMiddleWare from "./middleWare/user.js";
import AdminauthMiddleWare from "./middleWare/admin.js";
import accountRouter from "./routers/account.js";

connect("mongodb+srv://nicat:nicat@cluster0.r2ciceu.mongodb.net/?retryWrites=true&w=majority")
const app = express()

app.use(express.json())
app.use('/api/account', accountRouter)
app.use('/api/user',UserauthMiddleWare, userRouter)
app.use('/api/admin',AdminauthMiddleWare, adminRouter)



app.listen(5050,(req,res)=>{
    console.log('server is up...')
})
