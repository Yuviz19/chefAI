
export default function Main() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    console.log(newIngredient);
  }

  return (
    <main className="ingredientsMain">
      <h1 className="mainTitle">Let's Cook Something Special..</h1>
      <form className="ingredientsForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="add Ingredients"
          className="ingredientsInput"
          name="ingredient"
        />
        <button type="button"  className="ingredientsButton">+ Add Ingredients</button>
      </form>
    </main>
  )
}
