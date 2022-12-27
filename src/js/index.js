import { products, results, resultsCloseBtn, resultsHdrText, recipeResults, categoryResults, categoriesData, recResContents, recipeResultsHdr, priceFormatter } from "./incs.js";
import { titleCase, ignoreText, sortArray } from "./utils.js";
import { setCategoryResults, resetCategoryResults } from "./categoryResults.js";
import { resetRecipeResult } from "./recipeResults.js";
import Tabs from "./Tabs.js";
import { adjustProductPrice } from "./setRandomPrice.js";

const tabs = new Tabs(recResContents);
tabs.setStyle();

recipeResultsHdr.appendChild(tabs.tabsGroup);

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
	   if(child.classList.contains("product-price")) {
		   const productPrices = sortArray([adjustProductPrice(0.78), adjustProductPrice(0.98)]);
		   child.children[0].textContent = productPrices[0];
		   child.children[1].textContent = productPrices[1];
	   }
	       
	}
}
			   
resultsCloseBtn.addEventListener("click", () => {
    results.classList.add("hidden");
    resetCategoryResults(categoryResults);
    resetRecipeResult(recipeResults.children[1]);
});
