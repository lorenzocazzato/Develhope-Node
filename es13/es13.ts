import { Request, Response } from "express";
import Joi from "joi";

// Dummy database of planets
let planets = [
  { id: 1, name: "Mercury" },
  { id: 2, name: "Venus" },
  { id: 3, name: "Earth" },
  // ... other planets
];

// Validation schema for planet
const planetSchema = Joi.object({
  name: Joi.string().required(),
});

export const getAll = (req: Request, res: Response) => {
  res.json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");
  res.json(planet);
};

export const create = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };

  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Planet created successfully" });
};

export const updateById = (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  planet.name = req.body.name;
  res.json({ msg: "Planet updated successfully" });
};

export const deleteById = (req: Request, res: Response) => {
  const filteredPlanets = planets.filter(
    (p) => p.id !== parseInt(req.params.id)
  );
  if (filteredPlanets.length === planets.length)
    return res.status(404).send("Planet not found");

  planets = filteredPlanets;
  res.json({ msg: "Planet deleted successfully" });
};
