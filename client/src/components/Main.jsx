import { useState } from "react";
import { generateRecipe } from "../service/generateRecipe";
import RecipeCard from "./RecipeCard";

export default function Main() {
  const [ ingredients, setIngredients ] = useState([]);
  const [ recipe, setRecipe ] = useState(null);

  function submitIngerdient(formData) {
    const newIngredient = formData.get("ingredient");
    if (!newIngredient.trim()) {
      return;
    }

    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  };

  function removeIngredient(index) {
    setIngredients((prevIngredients) =>
       prevIngredients.filter((_, i) => i !== index)
    );
  }

  async function generateRecipeHandler() {
    try {
      const data = await generateRecipe(ingredients);
      console.log(data);
      setRecipe(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="ingredientsMain">
      <h1 className="mainTitle">Let's Cook Something Special..</h1>
      <form className="ingredientsForm" action={submitIngerdient}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="add Ingredients"
          className="ingredientsInput"
          name="ingredient"
        />
        <button type="submit"  className="ingredientsButton">+ Add Ingredients</button>
      </form>

      <ul className="ingredientList">
        {ingredients.map((ingredient, index) => {
          return (
          <li key={index} className="ingredientItem">{ingredient}
            <button type="button" onClick={() => removeIngredient(index)}>x</button>
          </li>
        )})}
      </ul>

      <button
        type="button"
        className="generateButton"
        disabled={ingredients.length === 0}
        onClick={generateRecipeHandler}
      >Generate Recipe</button>

      {recipe && <RecipeCard recipe={ recipe } />}
    </main>
  )
}
