import express from "express";
import { productCategoriesGet } from "./controllers/invControllers.js";
import { configDotenv } from "dotenv";
import { categoryRouter } from "./routes/categoryRouter.js";
import path from "path";

configDotenv();

const app = express();

const __dirname = path.resolve();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.get("/", productCategoriesGet);

app.use("/", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
