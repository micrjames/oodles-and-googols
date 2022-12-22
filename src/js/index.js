import { products, results, resultsCloseBtn, resultsHdrText, recipeResults, categoryResults, categoriesData } from "./incs.js";
import { titleCase, ignoreText } from "./utils.js";
import { setCategoryResults, resetCategoryResults } from "./categoryResults.js";

for(const product of products.children) {
    for(const child of product.children) {
	    if(child.tagName == "BUTTON")
		   child.addEventListener("click", () => {
			   const slicedId = ignoreText(child.id, "product-btn-", "-");
			   resultsHdrText.textContent = `${titleCase(slicedId)} Recipes`;
			   results.classList.remove("hidden");

			   setCategoryResults(categoryResults, categoriesData[slicedId].meals, 0);

			   categoryResults.classList.remove("hidden");

			   window.scrollTo(0, 0);
		   });
	}
}

resultsCloseBtn.addEventListener("click", () => {
    results.classList.add("hidden");
    resetCategoryResults(categoryResults);
});
