import { products, results } from "./incs.js";
import { titleCase, ignoreText } from "./utils.js";

const resultsHdr = results.children.namedItem("modal-header");
const resultsCloseBtn = resultsHdr.children.namedItem("modal-header-close");
const resultsHdrText = resultsHdr.children[1];

for(const product of products.children) {
    for(const child of product.children) {
	    if(child.tagName == "BUTTON")
		   child.addEventListener("click", () => {
			   const slicedId = ignoreText(child.id, "product-btn-", "-");
			   resultsHdrText.textContent = `${titleCase(slicedId)} Recipes`;
			   results.classList.remove("hidden");
			   window.scrollTo(0, 0);
		   });
	}
}

resultsCloseBtn.addEventListener("click", () => {
    results.classList.add("hidden");
});
