import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.send(categories);
};

export const getCategoriesById = async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(category);
};

export const getCategoriesByName = async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      name: req.params.name,
    },
  });
  res.send(category);
};

export const addCategory = async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: req.body.name,
        description: req.body.description,
      },
    });

    return res.send(category);
  } catch (error) {
    console.error(error);
    return res.json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const category = await prisma.category.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });
  res.send(category);
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!category)
      return res.status(404).json({
        message: "Category not found",
      });

    return res.send(category);
  } catch (error) {
    console.error(error)
    res.status(505).json({ error: error.message })
  }
};
