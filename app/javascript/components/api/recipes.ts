const TOKEN = (document.querySelector('meta[name="csrf-token"]' ) as HTMLMetaElement)?.content;

export const postRecipe = async (data: FormData) => {
    const url = "/recipes";

    let response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": TOKEN
        },
        body: data,
      });
    
    if (response.ok) {
        console.log("Response was OK");
        return response.json();
    }
    throw new Error("Network response was not ok.");
}

export const patchRecipe = async (data: FormData, recipeId: string) => {
    const url = `/recipes/${recipeId}`;

    let response = await fetch(url, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": TOKEN
        },
        body: data,
      });
    if (response.ok) {
        console.log("Response was OK");
        return response.json();
    }
    throw new Error("Network response was not ok.");
}

export const deleteRecipe = async (recipeId: string): Promise<boolean> => {
    const url = `/recipes/${recipeId}`;

    let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": TOKEN
        },
      });
    return response.ok;
}

export const getRecipe = async (recipeId: string) => {
    const url = `/recipes/${recipeId}`;

    let response = await fetch(url, {
        method: "GET",
        headers: {
          "X-CSRF-Token": TOKEN,
          "Accept": "application/json"
        },
      });
    if (response.ok) {
        console.log("Response was OK");
        return response.json();
    }
    throw new Error("Network response was not ok.");
}

export const getRecipes = async () => {
    const url = "/recipes";

    let response = await fetch(url, {
        method: "GET",
        headers: {
          "X-CSRF-Token": TOKEN,
          "Accept": "application/json"
        },
      });
    if (response.ok) {
        console.log("Response was OK");
        return response.json();
    }
    throw new Error("Network response was not ok.");
}