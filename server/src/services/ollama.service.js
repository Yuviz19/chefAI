import { ApiError } from "../utils/apiError.js";
import "dotenv/config";

const OLLAMA_URL = process.env.OLLAMA_BASE_URL;
const MODEL = process.env.OLLAMA_MODEL;

console.log("Service URL:", process.env.OLLAMA_BASE_URL);

const connection = async function () {
  let output = {
    status: "down",
    model: MODEL,
    ready: false,
  };

  let res;

  try {
    res = await fetch(`${OLLAMA_URL}/api/ps`, {
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new ApiError(503, "Ollama connection timed out");
    }

    throw new ApiError(503, "Ollama server is unavailable");
  }

  if (!res.ok) {
    throw new ApiError(502, "Unable to retrieve Ollama status");
  }

  const data = await res.json();

  output.status = "up";

  const model = data.models?.find(
    (m) => m.name === MODEL
  );

  output.ready = Boolean(model);

  return output;
};

const generateResponse = async function (ingredients) {
  const messages = [
    {
      role: "system",
      content: `
        You are ChefMate, an intelligent cooking assistant.

        Your task is to suggest exactly ONE recipe based on
        the ingredients provided by the user.

        Rules:
        1. Prioritize the ingredients supplied by the user.
        2. Do not claim unavailable ingredients are available.
        3. Additional ingredients must be marked as optional.
        4. Provide realistic ingredient quantities.
        5. Provide clear, sequential cooking instructions.
        6. Keep recipes practical and achievable.
        7. Return only the requested JSON structure.
      `,
    },
    {
      role: "user",
      content: `Available ingredients: ${ingredients.join(", ")}`,
    },
  ];

  const recipeSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      prepTime: { type: "integer" },
      cookTime: { type: "integer" },
      difficulty: {
        type: "string",
        enum: ["Easy", "Medium", "Hard"],
      },
      ingredients: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            quantity: { type: "string" },
            optional: { type: "boolean" },
          },
          required: ["name", "quantity", "optional"],
        },
      },
      instructions: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: [
      "name",
      "description",
      "prepTime",
      "cookTime",
      "difficulty",
      "ingredients",
      "instructions",
    ],
  };

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      format: recipeSchema,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new ApiError(502, "Ollama request failed");
  }

  const data = await response.json();
  const recipe = JSON.parse(data.message.content);

  return recipe;
};

export { connection, generateResponse };
