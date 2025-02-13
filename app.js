import express from "express";
import { productCategoriesGet } from "./controllers/invControllers.js";
import { configDotenv } from "dotenv";
import { categoryRouter } from "./routes/categoryRouter.js";
configDotenv();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", productCategoriesGet);

app.use("/", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
