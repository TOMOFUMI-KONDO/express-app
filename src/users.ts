import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const usersRouter = express.Router()

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/", async (req, res, next) => {
  try {
    const result = await prisma.user.create({
      data: { ...req.body },
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
