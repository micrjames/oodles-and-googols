import { fetchData } from "./fetchData.js";

const body = document.body;
const main = body.children.namedItem("main");

const products = main.children.namedItem("products");
const results = main.children.namedItem("results");

const resultsHdr = results.children.namedItem("modal-header");
const resultsCloseBtn = resultsHdr.children.namedItem("modal-header-close");
const resultsHdrText = resultsHdr.children[1];
                                    
const resultsBody = results.children.namedItem("modal-body");
const recipeResults = resultsBody.children.namedItem("recipe-results");
const categoryResults = resultsBody.children.namedItem("category-results");

const categoryVeganData = await fetchData("../data/recipe_category_vegan.json");
const categoryVegetarianData = await fetchData("../data/recipe_category_vegetarian.json");
const categoryNonData = await fetchData("../data/recipe_category_non_speciality.json");
const categoriesData = {
    "vegan": categoryVeganData,
    "vegetarian": categoryVegetarianData,
    "non speciality": categoryNonData
};

const choiceRecord = {
    "selections": [] 
};

export { products, results, resultsCloseBtn, resultsHdrText, recipeResults, categoryResults, categoriesData, choiceRecord };
