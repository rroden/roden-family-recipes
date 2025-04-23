import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CreatePageHeader from "./components/CreatePageHeader";

function Index() {
    let [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([])

    const [filterCategory, setFilterCategory] = useState<string>("");
    const [filterSubCategory, setFilterSubcategory] = useState<string>("");

    // need to either do this or use a let with a ternary
    const recipesToShow = useMemo(() => {
        if (!filterCategory){
            return recipes;
        }
        console.log(`This is my ${filterCategory}, ${typeof(filterCategory)}`)
        let filteredByCategory = recipes.filter((r) => r.recipe_category_id?.toString() === filterCategory);
        if (!filterSubCategory){
            return filteredByCategory;
        }
        return filteredByCategory.filter((r) => r.recipe_subcategory_id?.toString() === filterSubCategory)
    }, [filterCategory, filterSubCategory, recipes]);

    const validSubcategories = useMemo(() => {
        if (!filterCategory){
            return []
        }
        return subcategories.filter((subcategory) => subcategory.recipe_category_id?.toString() === filterCategory)
    }, [filterCategory, subcategories])

    const handleCategoryChange = (e: any) => {
        setFilterCategory(e.target.value);
    }

    const handleSubcategoryChange = (e: any) => {
        setFilterSubcategory(e.target.value);
    }

    useEffect(() => {
        fetch("/recipe_categories")
          .then((response) => response.json())
          .then((data) => setCategories(data))
          .catch((error) => console.error("Error fetching categories:", error));
      }, []);
  
      useEffect(() => {
        fetch("/recipe_subcategories")
          .then((response) => response.json())
          .then((data) => {
            setSubcategories(data)
          })
          .catch((error) => console.error("Error fetching subcategories:", error));
      }, []);

    useEffect(() => {
        const token = (document.querySelector('meta[name="csrf-token"]' ) as HTMLMetaElement)?.content;
        let url = `/recipes`;
        fetch(url, {
            headers: {
                "X-CSRF-Token": token,
                "Accept": "application/json"
            }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => {
                console.log(res);
                setRecipes(res);
            })
            .catch((error) => console.log(error.message));
    }, [])

    const handleClearFilters = () => {
        setFilterSubcategory("");
        setFilterCategory("");
    }

    return (
        <div className="home-page-background vw-100 h-100">
            <div className="overlay"></div>
            <CreatePageHeader/>
            <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <div className="row gx-2 pb-4 filter-row">
                    {/* div is needed in order for bootstrap grid classes to work */}
                    <div className="col-3">
                        <button className="dropdown-button">
                            <select 
                                className="index-page-dropdown" 
                                id="category"
                                onChange={handleCategoryChange}
                                value={filterCategory}
                            >
                                <option value="">Filter by category</option>
                                {categories.map((category) => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                }) }
                            </select>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="dropdown-button">
                            <select 
                                className="index-page-dropdown" 
                                id="subcategory"
                                onChange={handleSubcategoryChange}
                                value={filterSubCategory}
                            >
                                <option value="">Filter by subcategory</option>
                                {validSubcategories.map((subcategory) => {
                                    return <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                                }) }
                            </select>
                        </button>
                    </div>
                    <div className="col-2 filters-column px-4">
                        <button className="filters-link" onClick={handleClearFilters}>
                            Clear filters
                        </button>
                    </div>
                    <div className="col">
                        <Link
                            to="/recipes/create"
                            className="btn create-recipe-button"
                            role="button"
                            >
                            Add a Recipe
                        </Link>
                    </div>
                </div>
                <div className="row">
                {recipesToShow.map((recipe) => {
                    return (
                    <div className="col-4" key={recipe.id}>
                        <Link to={`recipes/${recipe.id}`}>
                            <div style={{ position: "relative", width: "100%", paddingTop: "100%" }}>
                                <img
                                    src={recipe?.photo_url}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                                <div className="bottom-0 start-50 translate-middle recipe-name-banner">
                                    <p className="recipe-name">{recipe?.name}</p>
                                </div>
                            </div>
                        </Link>
                    </div>)
                })}
                </div>
            </div>
            </div>
        </div>
)};

export default Index;