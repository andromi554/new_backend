import express from "express";
import cors from "cors";
import cookieParser  from "cookie-parser";
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit:"16kb",extended:true}));
app.use(express.urlencoded({limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser())

import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

app.use('/aip/v1/user',userRouter);
app.use('/api/v1/healthcheck',healthcheckRouter);
app.use(errorHandler)
export {app};