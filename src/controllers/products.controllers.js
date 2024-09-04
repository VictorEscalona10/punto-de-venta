import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
};

export const getProductsByName = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      name: req.params.name,
    },
  });

  if (!product)
    return res.status(404).json({
      message: "Product not found",
    });
  res.send(product);
};

export const getProductsById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!product)
    return res.status(404).json({
      message: "Product not found",
    });

  res.send(product);
};

export const addProduct = async (req, res) => {
  try {
    // Verificar si el producto ya existe
    const existingProduct = await prisma.product.findUnique({
      where: { name: req.body.name },
    });

    let product;
    if (existingProduct) {
      // Si existe, actualiza el stock sumando el nuevo stock
      product = await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          quantityInStock: existingProduct.quantityInStock + req.body.stock,
        },
      });
    } else {
      // Si no existe, crea un nuevo producto
      product = await prisma.product.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          categoryId: req.body.categoryId,
        },
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Error adding product");
  }
};

export const updateProduct = async (req, res) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
    },
  });
  res.send(product);
};

export const deleteProducts = async (req, res) => {
  try {
    const product = await prisma.product.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.send(product);
  } catch (error) {
    console.error(error)
    res.status(505).json({ error: error.message })
  }
};
