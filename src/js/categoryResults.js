import { createSpan, createBtn, createBtnGroup, removeChildren } from "./DOMutils.js";
import { titleCase } from "./utils.js";

const createCategoryResult = function(meal) {
   const categoryResult = document.createElement("div");                                    
   categoryResult.setAttribute("class", "category-result")
   
   const categoryResultThumb = createResultThumb(meal.strMealThumb); 
   categoryResult.appendChild(categoryResultThumb);
 
   const categoryResultTitle = createResultTitle(meal.strMeal);
   categoryResult.appendChild(categoryResultTitle); 

   return categoryResult;
};
const createCategoryBtnGroup = function() {
   const categoryResultsPrevBtn = createBtn("category-results-prev-btn", "btn", "less-than");
   const categoryResultsNextBtn = createBtn("category-results-next-btn", "btn", "greater-than");
   const categoryResultsBtnGroup = createBtnGroup("category-results-btn-group", [categoryResultsPrevBtn, categoryResultsNextBtn]);

   return categoryResultsBtnGroup;
};

const createResultThumb = function(thumb) {
   const categoryResultThumb = document.createElement("img");

   categoryResultThumb.setAttribute("class", "category-result-image-thumb")
   categoryResultThumb.src = thumb;

   return categoryResultThumb;
};
const createResultTitle = function(title) {
   const categoryResultTitle = createSpan(titleCase(title)); 
   categoryResultTitle.setAttribute("class", "category-result-title")

   return categoryResultTitle;
};

const setCategoryResult = function(meal) {
   const categoryResult = createCategoryResult(meal);
   return categoryResult;
};
const resetCategoryResults = function(categoryResults) {
   removeChildren(categoryResults);
};

export { setCategoryResult, resetCategoryResults, createCategoryBtnGroup };
