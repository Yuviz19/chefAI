import Router from "express";
import { generateRecipe } from "../controllers/recipe.controller.js";

const router = Router();
router.route("/generate").post(generateRecipe);

export default router;
