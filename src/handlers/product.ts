import prisma from "../db"

// Get all
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      products: true,
    },
  })

  res.json({ data: user.products })
}

// Get one
export const getOneProduct = async (req, res) => {
  const id = req.params.id

  const product = await prisma.product.findUnique({
    where: {
      id,
      userId: req.user.id,
    },
  })

  res.json({ data: product })
}

export const createProduct = async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    })

    res.json({ data: product })
  } catch (e) {
    console.log(e)
    if (e.code === "P2000") {
      throw new Error("The provided value for the column is too long")
    } else {
      throw new Error("unknown error create product")
    }
  }
}

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  })
  res.json({ data: updated })
}

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  })
  res.json({ data: deleted })
}
