import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create () {
    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])
    const [recipe_category, setRecipeCategory] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/recipe_subcategories";
    
        if (name.length == 0 || recipe_category == "")
          return;
    
        const body = {
          name: name,
          recipe_category_id: recipe_category
        };
    
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            if (response.ok) {
                console.log("Response was ok")
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) => navigate(`/recipe_subcategory/${response.id}`))
          .catch((error) => console.log(error.message));
      };
    
    useEffect(() => {
        fetch("/recipe_categories")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Got error while fetching categories", error))
    }, [])

    return (
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
            <h1 className="secondary-title">Roden Family Recipes</h1>
            <h2 className="lead">
            Add a Recipe Subcategory
            </h2>
            <form>
                <label for="name">
                    Name:
                    <input 
                        id="name" 
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label for="category">
                    <select id="category" value={recipe_category} onChange={(e) => setRecipeCategory(e.target.value)}>
                        <option>Select a recipe category</option>
                        {categories.map((category) => {
                            return <option key={category.id} value={category.id}>{category.name}</option>
                        })}
                    </select>
                </label>
                <hr className="my-4" />
                <button onClick={(e) => handleSubmit(e)}>
                    Save Recipe Subcategory
                </button>
            </form>
        </div>
        </div>
    </div>
)};

export default Create;