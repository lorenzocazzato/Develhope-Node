import express from "express";
import bodyParser from "body-parser";
import Joi from "joi";
import process from "process";

const app = express();
app.use(bodyParser.json());

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

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

app.get("/api/planets", (req, res) => {
  res.json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === id);
  if (!planet) return res.status(404).json({ error: "Planet not found" });
  res.json(planet);
});

app.post("/api/planets", (req, res) => {
  const newPlanet = req.body;

  const { error } = planetSchema.validate(newPlanet);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created" });
});

app.put("/api/planets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPlanet = req.body;

  const { error } = planetSchema.validate(updatedPlanet);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const index = planets.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Planet not found" });

  planets[index] = updatedPlanet;
  res.json({ msg: "Planet updated" });
});

app.delete("/api/planets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = planets.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Planet not found" });

  planets.splice(index, 1);
  res.json({ msg: "Planet deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
