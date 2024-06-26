import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
// config
// start
app.use(
  cors({
    origin: "*", // Allow requests from any origin (for development purposes)
    credentials: true,
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// end

// import routes
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js";


// routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/todos", todoRouter);


export {app}