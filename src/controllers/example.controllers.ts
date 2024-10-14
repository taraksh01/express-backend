import { Request, Response } from "express";
import { ExampleItem } from "../types/example.types";
import { capitalizeString, generateRandomId } from "../utils/example.utils";

export const getExample = (req: Request, res: Response): void => {
  const exampleItem: ExampleItem = {
    id: generateRandomId(),
    name: capitalizeString("example"),
    description: "This is an example item",
  };

  res.json(exampleItem);
};

export const postExample = (req: Request, res: Response): void => {
  const { name = "Not provided", description = "Not provided" } = req.body;
  const newItem: ExampleItem = {
    id: generateRandomId(),
    name: capitalizeString(name),
    description,
  };

  res.status(201).json(newItem);
};
