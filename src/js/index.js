import { products, results, resultsCloseBtn, resultsHdrText, recipeResults, categoryResults, categoriesData } from "./incs.js";
import { titleCase, ignoreText } from "./utils.js";
import { setCategoryResult, resetCategoryResults, createCategoryBtnGroup } from "./categoryResults.js";

for(const product of products.children) {
    for(const child of product.children) {
	    if(child.tagName == "BUTTON")
		   child.addEventListener("click", () => {
			   const slicedId = ignoreText(child.id, "product-btn-", "-");
			   resultsHdrText.textContent = `${titleCase(slicedId)} Recipes`;
			   results.classList.remove("hidden");

			   for(const meal of categoriesData[slicedId].meals) {
				  const categoryResult = setCategoryResult(meal);	
				  categoryResults.appendChild(categoryResult);
			   }
			   const categoryResultsBtnGroup = createCategoryBtnGroup();
			   categoryResults.appendChild(categoryResultsBtnGroup);

			   categoryResults.classList.remove("hidden");

			   window.scrollTo(0, 0);
		   });
	}
}

resultsCloseBtn.addEventListener("click", () => {
    results.classList.add("hidden");
    resetCategoryResults(categoryResults);
});
