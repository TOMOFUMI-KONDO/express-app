import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const postsRouter = express.Router()

postsRouter.get("/", async (req, res, next) => {
  try {
    const publishedPosts = await prisma.post.findMany({ where: { published: true }, include: { author: true } })
    res.json(publishedPosts)
  } catch (error) {
    next(error)
  }
})

postsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await prisma.post.findFirst({ where: { id: Number(id) } })
    res.json(post)
  } catch (error) {
    next(error)
  }
})

postsRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body as { title: string; content: string; authorEmail: string }
    const { title, content, authorEmail } = body
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } },
      },
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

postsRouter.put("/publish/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        published: true,
      },
    })
    res.json(post)
  } catch (error) {
    next(error)
  }
})

postsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedPost = await prisma.post.delete({ where: { id: Number(id) } })
    res.json(deletedPost)
  } catch (error) {
    next(error)
  }
})

export default postsRouter
