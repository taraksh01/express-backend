import { Request, Response } from "express";
import { ExampleItem } from "../types/example.types";
import { capitalizeString, generateRandomId } from "../utils/example.utils";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";

export const getExample = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const exampleItem: ExampleItem = {
      id: generateRandomId(),
      name: capitalizeString("example"),
      description: "This is an example item",
    };

    res.status(200).json(new ApiResponse(200, exampleItem));
  } catch (error) {
    throw new ApiError(500, "Failed to get example item");
  }
});

export const postExample = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { name = "Not provided", description = "Not provided" } = req.body;
    const newItem: ExampleItem = {
      id: generateRandomId(),
      name: capitalizeString(name),
      description,
    };

    res.status(201).json(new ApiResponse(201, newItem));
  } catch (error) {
    throw new ApiError(500, "Failed to create example item");
  }
});
