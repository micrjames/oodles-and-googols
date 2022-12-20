import { products, results } from "./incs.js";

const resultsHdr = results.children.namedItem("modal-header");
const resultsCloseBtn = resultsHdr.children.namedItem("modal-header-close");
const resultsHdrText = resultsHdr.children[1];
resultsHdrText.textContent = "Recipes";

for(const product of products.children) {
    for(const child of product.children) {
	    if(child.tagName == "BUTTON")
		   child.addEventListener("click", () => {
			   results.classList.remove("hidden");
			   window.scrollTo(0, 0);
		   });
	}
}

resultsCloseBtn.addEventListener("click", () => {
    results.classList.add("hidden");
});
