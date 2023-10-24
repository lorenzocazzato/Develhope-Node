import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const pk = process.env.PUBLIC_KEY;

app.use(express.json());
app.use(morgan("dev"));

type Planet = {
  id: number;
  name: string;
};

let planets: Planet[] = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/planets", (req: Request, res: Response) => {
  res.json(planets);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
