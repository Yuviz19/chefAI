const API = "http://localhost:8000/api/v1/recipes";

export async function generateRecipe(ingredients) {
  const response = await fetch(
    `${API}/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredients }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate the response");
  }

  const result = await response.json();
  return result.data;
}
