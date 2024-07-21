import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const dirname = path.resolve();
  app.use(express.static(path.json(dirname, "forntend/dist")));
  app.get("*", (req, res) =>
    res.send(path.resolve(dirname, "frontend", "dist", "index.html"))
  );
}
app.get("/", (req, res) => {
  res.send("server is ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening to route ${port}`));
