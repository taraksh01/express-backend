import express from "express";
import { getExample, postExample } from "../controllers/example.controllers";

const router = express.Router();

router.get("/", getExample);
router.post("/", postExample);

export default router;
