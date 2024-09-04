import express from "express";
import routesInventory from "./routes/routes.inventory.js";
import routesProducts from "./routes/routes.products.js";

// manejar errores en las rutas con try catch, hacer las rutas de las ventas y todo lo que tenga que ver, terminar los controllers

const app = express();

app.use(express.json());

app.use('/inv' ,routesInventory);
app.use('/prod' ,routesProducts);

app.listen(3000 || process.env.PORT, () => {
  console.log("Server running on port 3000");
});