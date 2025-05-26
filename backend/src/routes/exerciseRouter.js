import {
  getAllExercises,
  getExercise,
} from "../controllers/exerciseController.js";
import { Router } from "express";
import { tokenVerification } from "../utils/tokenHandler.js";

export const exerciseRouter = Router();
exerciseRouter.get("/getAllExercises", tokenVerification, getAllExercises);
exerciseRouter.get("/getExercise/:id", tokenVerification, getExercise);
