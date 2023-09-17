import { Router } from "express"
import { body, checkExact } from "express-validator"
import { asyncErrHandler, handleInputErrors } from "./modules/middleware"
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product"
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update"

const router = Router()

// Product
router.get("/product", getProducts)
router.get("/product/:id", getOneProduct)
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
)
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  asyncErrHandler(createProduct)
)
router.delete("/product/:id", deleteProduct)

// Update
router.get("/update", getUpdates)
router.get("/update/:id", getOneUpdate)
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  handleInputErrors,
  updateUpdate
)
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  // checkExact([], { locations: ["body"] }),
  handleInputErrors,
  asyncErrHandler(createUpdate)
)
router.delete("/update/:id", deleteUpdate)

// Update Point
router.get("/update-point", () => {})
router.get("/update-point/:id", () => {})
router.put(
  "/update-point/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
)
router.post(
  "/update-point",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  () => {}
)
router.delete("/update-point/:id", () => {})

export default router
