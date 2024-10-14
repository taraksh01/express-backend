import express from "express";
import dotenv from "dotenv";
import exampleRoutes from "./routes/example.routes";
import healthRoutes from "./routes/health.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/example", exampleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
