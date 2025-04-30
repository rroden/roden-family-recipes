import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { getRecipeCategories } from "../components/api/recipeCategories";
import { Category, Subcategory } from "../components/recipe/types/recipe_types";
import { getRecipeSubcategories } from "../components/api/recipeSubcategories";

type AppState = {
  categories: Category[];
  subcategories: Subcategory[];
};

type AppProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = (props: AppProviderProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([])

    useEffect(() => {
      console.log("Loading recipe categories")
        const loadRecipeCategories = async () => {
        try {
            let response = await getRecipeCategories();
            setCategories(response);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
        };

        loadRecipeCategories()

    }, []);

    useEffect(() => {
      console.log("Loading recipe subcategories")
        const loadRecipeSubcategories = async () => {
        try {
            let response = await getRecipeSubcategories();
            setSubcategories(response);
        }
        catch (error) {
            console.error("Error fetching subcategories:", error);
        }
        };

        loadRecipeSubcategories()

    }, []);

  return (
    <AppContext.Provider value={{categories, subcategories}}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
