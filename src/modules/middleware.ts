import { validationResult } from "express-validator"

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors)
    throw new Error("handle input error")
  } else {
    next()
  }
}

export const asyncErrHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next)
}

export const errorHandler = () => (err, req, res, next) => {
  res.status(400).json({ error: err })
}
