import { Request, Response } from "express";

export const getHealth = (req: Request, res: Response): void => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
};
