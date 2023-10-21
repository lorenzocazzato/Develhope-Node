const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/planets", (req, res) => {
  res.json(planets);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
