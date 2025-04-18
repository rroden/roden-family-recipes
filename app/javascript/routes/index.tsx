import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Create from "../components/recipe/Create";
import CategoryCreate from "../components/recipe_category/Create"
import SubcategoryCreate from "../components/recipe_subcategory/Create"
import CategoryShow from "../components/recipe_category/Show"
import Show from "../components/recipe/Show";
import Edit from "../components/recipe/Edit";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes/create" element={<Create />} />
      <Route path="/recipe_categories/create" element={<CategoryCreate/>}/>
      <Route path="/recipe_subcategories/create" element={<SubcategoryCreate/>}/>
      <Route path="/recipe_categories/:id" element={<CategoryShow/>}/>
      <Route path="/recipe/:id" element={<Show/>}/>
      <Route path="/recipes/:id/edit" element={<Edit/>}/>
    </Routes>
  </Router>
);