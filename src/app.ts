import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") dotenv.config()

import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import usersRouter from "./users"
import postsRouter from "./posts"

const app = express()

app.use(express.json())
app.use(express.static("src/public"))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

const port = 3000
app.listen(port, () => console.log("Listening on http:localhost:", port))

app.use((req, res, next) => {
  console.log("Path: ", req.originalUrl)
  console.log("Headers:", req.headers)
  console.log("Body:", req.body)
  next()
})

app.get("/", (req, res) => res.send("This is Home!."))

app.use("/users", usersRouter)
app.use("/posts", postsRouter)

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).send({ error: err.toString() })
})
