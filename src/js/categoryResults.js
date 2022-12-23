import { createSpan, createBtn, createBtnGroup, removeChildren } from "./DOMutils.js";
import { titleCase } from "./utils.js";
import { choiceRecord } from "./incs.js";

const mealsPerPage = 6;
let whereSliceStart;
let sliceEnd;
let resultsPage = 0;
const setCategoryResults = function(categoryResults, meals, sliceStart) {
   whereSliceStart = sliceStart;
   sliceEnd = sliceStart + mealsPerPage;
   let mealsSlice;
   if(meals.length <= mealsPerPage) mealsSlice = meals;
   else {
	  mealsSlice = meals.slice(sliceStart, sliceEnd);
   }

   createCategoryResults(categoryResults, meals, mealsSlice, choiceRecord.selections);
};
const createCategoryResults = function(categoryResults, meals, mealsSlice, mealSelections) {
   let selFlag;
   console.log(mealSelections);
   for(let mealIndex = 0; mealIndex < mealsSlice.length; mealIndex++) {
	   selFlag = mealSelections.includes(resultsPage*mealsPerPage+mealIndex);
       const categoryResult = createCategoryResult(categoryResults, mealsSlice[mealIndex], selFlag);   
       categoryResults.appendChild(categoryResult);
   }

   const categoryResultsBtnGroup = createCategoryBtnGroup(categoryResults, meals);
   categoryResults.appendChild(categoryResultsBtnGroup);

   return categoryResultsBtnGroup.children;
};
const createCategoryResult = function(categoryResults, meal, selFlag) {
   const categoryResult = document.createElement("div");                                    
   categoryResult.setAttribute("class", "category-result")
   
   const categoryResultThumb = createResultThumb(meal.strMealThumb); 
   categoryResult.appendChild(categoryResultThumb);
 
   const categoryResultTitle = createResultTitle(meal.strMeal);
   categoryResult.appendChild(categoryResultTitle); 

   const categoryResultSelect = document.createElement("div");
   categoryResult.appendChild(categoryResultSelect);

   if(selFlag) {
	   categoryResult.classList.add("selection");
	   categoryResultSelect.classList.add("selection");
   }

   categoryResult.addEventListener("click", function() {
	   categoryResult.classList.add("selection");
	   categoryResultSelect.classList.add("selection");

	   const selections = getSelectionIndices(categoryResults);
	   selections.forEach(selection => {
		  	if(!choiceRecord.selections.includes(selection))
				choiceRecord.selections = [...choiceRecord.selections, selection];
	   });
   });

   return categoryResult;
};
const createCategoryBtnGroup = function(categoryResults, meals) {
   const categoryResultsPrevBtn = createBtn("category-results-prev-btn", "btn", "less-than");
   const categoryResultsNextBtn = createBtn("category-results-next-btn", "btn", "greater-than");

   categoryResultsPrevBtn.addEventListener("click", function() {
	  resultsPage--;
	  whereSliceStart-=mealsPerPage;
	  sliceEnd = whereSliceStart+mealsPerPage;
	  const mealsSlice = meals.slice(whereSliceStart, sliceEnd);
	  resetCategoryResults(categoryResults);
	  createCategoryResults(categoryResults, meals, mealsSlice, choiceRecord.selections);
   });
   categoryResultsNextBtn.addEventListener("click", function() {
	  resultsPage++;
	  whereSliceStart+=mealsPerPage;
	  sliceEnd = whereSliceStart+mealsPerPage;
	  const mealsSlice = meals.slice(whereSliceStart, sliceEnd);
	  resetCategoryResults(categoryResults);
	  createCategoryResults(categoryResults, meals, mealsSlice, choiceRecord.selections);

   });
   if(whereSliceStart == 0) {
	   categoryResultsPrevBtn.disabled = true;
   } 
   if(meals.length - whereSliceStart < mealsPerPage) {
	   categoryResultsNextBtn.disabled = true;
   }
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

const getSelectionIndices = function(categoryResults) {
	let selections = [];

	for(let resultIndex = 0; resultIndex < categoryResults.children.length; resultIndex++) {
	   if(resultIndex != categoryResults.children.length-1)
		   selections = [...selections, categoryResults.children[resultIndex]];
	}

	selections = selections.map((selection, selectionIndex) => {
		if(selection.classList.contains("selection")) return resultsPage*mealsPerPage+selectionIndex;
	});
	selections = selections.filter(selection => selection !== undefined);

    return selections;
};

export { setCategoryResults, resetCategoryResults };
