// routes/index.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Create from "../components/recipe/Create";
import CategoryCreate from "../components/recipe_category/Create";
import SubcategoryCreate from "../components/recipe_subcategory/Create";
import CategoryShow from "../components/recipe_category/Show";
import Show from "../components/recipe/Show";
import Edit from "../components/recipe/Edit";
import Index from "../components/recipe/Index";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="recipes/create" element={<Create />} />
        <Route path="recipe_categories/create" element={<CategoryCreate />} />
        <Route path="recipe_subcategories/create" element={<SubcategoryCreate />} />
        <Route path="recipe_categories/:id" element={<CategoryShow />} />
        <Route path="recipes/:id" element={<Show />} />
        <Route path="recipes/:id/edit" element={<Edit />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
