import { products, results, resultsCloseBtn, resultsHdrText, recipeResults, categoryResults } from "./incs.js";
import { titleCase, ignoreText } from "./utils.js";
import { createCategoryResult } from "./categoryResults.js";

const meals = [
   {"strMeal":"Roast fennel and aubergine paella","strMealThumb":"https://www.themealdb.com/images/media/meals/1520081754.jpg","idMeal":"52942"},
   {"strMeal":"Vegan Chocolate Cake","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/qxutws1486978099.jpg","idMeal":"52794"},
   {"strMeal":"Vegan Lasagna","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/rvxxuy1468312893.jpg","idMeal":"52775"}
];

for(const product of products.children) {
    for(const child of product.children) {
	    if(child.tagName == "BUTTON")
		   child.addEventListener("click", () => {
			   const slicedId = ignoreText(child.id, "product-btn-", "-");
			   resultsHdrText.textContent = `${titleCase(slicedId)} Recipes`;
			   results.classList.remove("hidden");

			   for(const meal of meals) {
				  const categoryResult = createCategoryResult(meal);	
				  categoryResults.appendChild(categoryResult);
			   }
			   categoryResults.classList.remove("hidden");

			   window.scrollTo(0, 0);
		   });
	}
}

resultsCloseBtn.addEventListener("click", () => {
    results.classList.add("hidden");
});
