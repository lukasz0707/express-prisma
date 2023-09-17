import express from "express"
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth"
import { createNewUser, signIn } from "./handlers/user"
import { asyncErrHandler, errorHandler } from "./modules/middleware"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.json({ message: "hello" })
})

app.use("/api", protect, router)

app.post("/user", asyncErrHandler(createNewUser))
app.post("/signin", signIn)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(400)
  res.json({ error: err.message })
})

export default app
