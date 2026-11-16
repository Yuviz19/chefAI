import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { connection, generateResponse } from "../services/ollama.service.js";

const generateRecipe = asyncHandler(async (req, res) => {
  const { ingredients } = req.body;

  if (
    !Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    ingredients.some(
      (item) => typeof item !== "string" || !item.trim()
    )
  ) {
    throw new ApiError(400, "Please provide valid ingredients");
  }

  const recipe = await generateResponse(ingredients);

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      recipe,
      "Recipe generated successfully"
    ));
});

export { generateRecipe };
