import { Router } from "express";
import { getProducts, getProductsByName, getProductsById, addProduct, updateProduct, deleteProducts } from "../controllers/products.controllers.js";

const router = Router();

router.get("/", getProducts);

router.get("/:name", getProductsByName);

router.get("/:id", getProductsById);

router.post("/add", addProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProducts);

export default router;
