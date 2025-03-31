import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create () {
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const url = "/recipe_categories";
    
        if (name.length == 0)
          return;
    
        const body = {
          name
        };
    
        const token = (document.querySelector('meta[name="csrf-token"]' ) as HTMLMetaElement)?.content;

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
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) => navigate(`/recipe_categories/${response.id}`))
          .catch((error) => console.log(error.message));
      };
    
    return (
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
            <h1 className="secondary-title">Roden Family Recipes</h1>
            <h2 className="lead">
            Add a Recipe Category
            </h2>
            <form>
                <label htmlFor="name">
                    Name:
                    <input 
                        id="name" 
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <hr className="my-4" />
                <button onClick={(e) => handleSubmit(e)}>
                    Save Recipe Category
                </button>
            </form>
        </div>
        </div>
    </div>
)};

export default Create;