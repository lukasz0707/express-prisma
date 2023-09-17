import prisma from "../db"
import { comparePasswords, createJWT, hashPassword } from "../modules/auth"

export const createNewUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    })
    const token = createJWT(user)
    res.json({ token })
  } catch (e) {
    console.log(e)
    if (e.code === "P2002") {
      throw new Error("username already exists")
    } else {
      throw new Error("create user error")
    }
  }
}

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  if (!user) {
    res.status(401)
    res.json({ message: "incorrect username or password" })
    return
  }
  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: "incorrect username or password" })
    return
  }
  const token = createJWT(user)
  res.json({ token })
}
