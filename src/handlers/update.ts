import prisma from "../db"

// Get all
export const getUpdates = async (req, res) => {
  const updates = await prisma.product.findMany({
    where: {
      userId: req.user.id,
    },
    select: {
      updates: true,
    },
  })

  res.json({ data: updates })
}

// Get one
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  })

  res.json({ data: update })
}

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
      userId: req.user.id,
    },
  })

  if (!product) {
    throw new Error(
      "Product doesn't exist, or you don't have permision to change it"
    )
  }

  const update = await prisma.update.create({
    data: {
      userId: req.user.id,
      ...req.body,
    },
  })

  res.json({ data: update })
}

export const updateUpdate = async (req, res) => {
  // const product = await prisma.product.update({
  //   where: {
  //     userId: req.user.id,
  //   },
  //   data: {
  //     updates: {
  //       update: {
  //         where: {
  //           id: req.params.id,
  //         },
  //         data: {

  //         }
  //       },
  //     },
  //   },
  //   include: {
  //     updates: true,
  //   },
  // })
  const update = await prisma.update.update({
    where: {
      userId: req.user.id,
      id: req.params.id,
    },
    data: req.body,
  })

  res.json({ data: update })
}

export const deleteUpdate = async (req, res) => {
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  })

  res.json({ data: deleted })
}
