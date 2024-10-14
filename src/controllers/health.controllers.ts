import { Request, Response } from "express";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";

export const getHealth = AsyncHandler(async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, { status: "OK" }, "Server is healthy"));
  } catch (error) {
    throw new ApiError(500, "Failed to get health status");
  }
});
