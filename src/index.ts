import express, { NextFunction, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import exampleRoutes from "./routes/example.routes";
import healthRoutes from "./routes/health.routes";
import ApiError from "./utils/ApiError";

dotenv.config({ path: ".env" });

const app: Application = express();
const port = process.env.PORT || 5555;
const allowedOrigins = "*"; // Allows anyone to access the API

app.use(express.json({ limit: "20kb" })); // Limit the body size to 20kb
app.use(cors({ origin: allowedOrigins }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/example", exampleRoutes);

// If your application using database, Establish database connection here
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
    data: null,
  });
});

export default app;
