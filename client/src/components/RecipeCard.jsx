export default function RecipeCard({ recipe }) {
  return (
    <section className="recipeCard">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>

      <div className="recipeMeta">
        <span>Prep: {recipe.prepTime} min</span>
        <span>Cook: {recipe.cookTime} min</span>
        <span>Difficulty: {recipe.difficulty}</span>
      </div>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>
            {item.name} — {item.quantity}
            {item.optional && " (Optional)"}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
