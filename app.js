require("express-async-errors");
const express = require("express")
const app = express()
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5001

const authRouter = require("./src/routes/authRoutes");
const topicRouter = require("./src/routes/topicRoutes");
const entryRouter = require("./src/routes/entryRoutes");
const errorHandlerMiddleware = require("./src/middlewares/errorhandler");
const userRouter = require("./src/routes/userRoutes");


app.use(express.json())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb", extended:true, parameterLimit:500000}))

app.use("/api", authRouter);
app.use("/api", topicRouter);
app.use("/api", entryRouter);
app.use("/api", userRouter);

app.get ("/",(req,res)=>{
    res.json({
        message:"Hoşgeldiniz"
    })
})

app.use(errorHandlerMiddleware)

app.listen(port,()=>{
    console.log("Server "+ port + " üzerinde çalışıyor")
})