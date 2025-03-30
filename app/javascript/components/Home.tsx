import { Link } from "react-router-dom";

export default () => (
  <div className="home-page-background vw-100 h-100">
    <div className="overlay"></div>
    <header className="home-page-header">
      <h1 className="home-page-title">Roden Family Recipes</h1>
      <Link
          to="/recipes/create"
          className="btn create-recipe-button"
          role="button"
        >
          Add a Recipe
      </Link>
    </header>
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <p className="lead">
          A curated list of recipes for the best homemade meal and delicacies.
        </p>
        <hr className="my-4" />
        <Link
          to="/recipes"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Recipes
        </Link>
        <Link
          to="/recipe_categories/create"
          className="btn btn-lg custom-button"
          role="button"
        >
          Create Recipe Category
        </Link>
        <Link
          to="/recipe_subcategories/create"
          className="btn btn-lg custom-button"
          role="button"
        >
          Create Recipe Subcategory
        </Link>
      </div>
    </div>
  </div>
);