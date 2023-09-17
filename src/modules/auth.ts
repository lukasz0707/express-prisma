import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  )
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  console.log(bearer)
  if (!bearer) {
    res.status(401)
    res.json({ message: "unauthorized auth header not provided" })
    return
  }

  const [, token] = bearer.split(" ")
  if (!token) {
    res.status(401)
    res.json({ message: "not valid token" })
    return
  }

  // try {
  //   const user = jwt.verify(token, process.env.JWT_SECRET)
  //   req.user = user
  //   next()
  // } catch (e) {
  //   console.error(e)
  //   res.status(401)
  //   res.json({ message: "not valid token" })
  //   return
  // }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // console.log(err)
      res.status(401)
      res.json({ message: "not valid token" })
      return
    }
    req.user = decoded
    next()
  })
}
