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

const categoryVeganData = await fetchData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan");
const categoryVegetarianData = await fetchData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian");
const categoryBeefData = await fetchData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef");
const categoryChickenData = await fetchData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken");
const categoryNonData = await fetchData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta");
const categoriesData = {
    "vegan": categoryVeganData,
    "vegetarian": categoryVegetarianData,
    "beef": categoryBeefData,
    "chicken": categoryChickenData,
    "non speciality": categoryNonData
};

const choiceRecord = {
    "selections": [] 
};

export { products, results, resultsCloseBtn, resultsHdrText, recipeResults, categoryResults, categoriesData, choiceRecord };
