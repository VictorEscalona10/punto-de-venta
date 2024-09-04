import { Router } from "express";
import {
  getCategories,
  getCategoriesById,
  getCategoriesByName,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/inventory.controllers.js";

const router = Router();

router.get("/", getCategories);

router.get("/:name", getCategoriesByName);

router.get("/:id", getCategoriesById);

router.post("/add", addCategory);

router.put("/update/:id", updateCategory);

router.delete("/delete/:id", deleteCategory);

export default router;
