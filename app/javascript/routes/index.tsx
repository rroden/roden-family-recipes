import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Create from "../components/recipe/Create";
import CategoryCreate from "../components/recipe_category/Create"
import SubcategoryCreate from "../components/recipe_subcategory/Create"
import CategoryShow from "../components/recipe_category/Show"

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes/create" element={<Create />} />
      <Route path="/recipe_categories/create" element={<CategoryCreate/>}/>
      <Route path="/recipe_subcategories/create" element={<SubcategoryCreate/>}/>
      <Route path="/recipe_categories/:id" element={<CategoryShow/>}/>
    </Routes>
  </Router>
);