import { createSpan, createBtn, createBtnGroup, removeChildren } from "./DOMutils.js";
import { titleCase } from "./utils.js";

const mealsPerPage = 6;
let whereSliceStart;
let sliceEnd;
const setCategoryResults = function(categoryResults, meals, sliceStart) {
   whereSliceStart = sliceStart;
   sliceEnd = sliceStart + mealsPerPage;
   let mealsSlice;
   if(meals.length <= mealsPerPage) mealsSlice = meals;
   else {
	  mealsSlice = meals.slice(sliceStart, sliceEnd);
   }

   createCategoryResults(categoryResults, meals, mealsSlice);
};
const createCategoryResults = function(categoryResults, meals, mealsSlice) {
   for(const meal of mealsSlice) {
       const categoryResult = createCategoryResult(meal);   
       categoryResults.appendChild(categoryResult);
   }

   const categoryResultsBtnGroup = createCategoryBtnGroup(categoryResults, meals);
   categoryResults.appendChild(categoryResultsBtnGroup);

   return categoryResultsBtnGroup.children;
};
const createCategoryResult = function(meal) {
   const categoryResult = document.createElement("div");                                    
   categoryResult.setAttribute("class", "category-result")
   
   const categoryResultThumb = createResultThumb(meal.strMealThumb); 
   categoryResult.appendChild(categoryResultThumb);
 
   const categoryResultTitle = createResultTitle(meal.strMeal);
   categoryResult.appendChild(categoryResultTitle); 

   return categoryResult;
};
const createCategoryBtnGroup = function(categoryResults, meals) {
   const categoryResultsPrevBtn = createBtn("category-results-prev-btn", "btn", "less-than");
   const categoryResultsNextBtn = createBtn("category-results-next-btn", "btn", "greater-than");

   if(whereSliceStart == 0) {
	   categoryResultsPrevBtn.disabled = true;
   } 
   if(meals.length - sliceEnd > mealsPerPage){
	   categoryResultsNextBtn.disabled = true;
   }
   categoryResultsPrevBtn.addEventListener("click", function() {
	  whereSliceStart-=6;
	  sliceEnd = whereSliceStart+6;
	  const mealsSlice = meals.slice(whereSliceStart, sliceEnd);
	  resetCategoryResults(categoryResults);
	  createCategoryResults(categoryResults, meals, mealsSlice);
   });
   categoryResultsNextBtn.addEventListener("click", function() {
	  whereSliceStart+=6;
	  sliceEnd = whereSliceStart+6;
	  const mealsSlice = meals.slice(whereSliceStart, sliceEnd);
	  resetCategoryResults(categoryResults);
	  createCategoryResults(categoryResults, meals, mealsSlice);
   });
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

const resetCategoryResults = function(categoryResults) {
   removeChildren(categoryResults);
};

export { setCategoryResults, resetCategoryResults };
