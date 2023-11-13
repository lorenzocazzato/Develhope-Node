import "dotenv/config";
import morgan from "morgan";
import express, { Request, Response, response } from "express";
import { request } from "http";
import Joi from "joi";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "../es14/es14";
import { logIn, signUp, logOut } from "./controllers/users";
import multer from "multer";
import authorize from "./authorize";

const app = express();
const port = process.env.PORT;
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app
  .use(morgan("dev"))
  .use(express.json())
  .post("/api/users/login", logIn)
  .post("/api/users/signup", signUp)
  .delete("/api/planets/:id", deleteById)
  .get("/api/users/logout", authorize, logOut)
  .listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
