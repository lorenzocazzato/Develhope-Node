const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

app.get("/api/planets", (req, res) => {
  res.json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");
  res.json(planet);
});

app.post("/api/planets", (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
});

app.put("/api/planets/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  planet.name = req.body.name;
  res.json({ msg: "Planet updated successfully" });
});

app.delete("/api/planets/:id", (req, res) => {
  const index = planets.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Planet not found");

  planets.splice(index, 1);
  res.json({ msg: "Planet deleted successfully" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
