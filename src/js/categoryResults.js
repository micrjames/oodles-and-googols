import { createSpan, createBtn, createBtnGroup, removeChildren } from "./DOMutils.js";
import { titleCase, getRecipe } from "./utils.js";
import { choiceRecord, recipeResults, recipeResultsHdr } from "./incs.js";
import { setRecipeResult } from "./recipeResults.js";
import Tabs from "./Tabs.js";

const mealsPerPage = 6;
let whereSliceStart;
let sliceEnd;
let resultsPage = 0;
let tabs;

const setCategoryResults = function(categoryResults, meals, sliceStart) {
   choiceRecord.selections = [];
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
   for(let mealIndex = 0; mealIndex < mealsSlice.length; mealIndex++) {
	   selFlag = mealSelections.includes(resultsPage*mealsPerPage+mealIndex);
       const categoryResult = createCategoryResult(categoryResults, mealsSlice[mealIndex], selFlag);   
       categoryResults.appendChild(categoryResult);
   }

   const categoryResultsBtnGroup = createCategoryBtnGroup(categoryResults, meals);
   categoryResults.appendChild(categoryResultsBtnGroup);
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
   const categoryResultSelectBtn = createBtn("category-result-select-btn", "btn", "utensils"); 

   let tabEnabled;

   categoryResultsPrevBtn.addEventListener("click", function() {
	  resultsPage--;
	  whereSliceStart-=mealsPerPage;
	  sliceEnd = whereSliceStart+mealsPerPage;
	  const mealsSlice = meals.slice(whereSliceStart, sliceEnd);
	  resetCategoryResults(categoryResults);
	  createCategoryResults(categoryResults, meals, mealsSlice, choiceRecord.selections);
   });
   categoryResultSelectBtn.addEventListener("click", function() {
	   removeChildren(recipeResultsHdr);
	   
	   let recipes = [];
	   let recResContents = []; 
	   let resContents = {};
	   choiceRecord.selections.forEach((selection, selectionIndex) => {
		   const mealId = meals[selection].idMeal;
		   if(selectionIndex == 0) tabEnabled = false;
		   else tabEnabled = true;
		   resContents = {text: `Recipe ${selectionIndex}`, enabled: tabEnabled};
		   recResContents[selectionIndex] = resContents; 
	
		   const recipePromise = getRecipe(mealId);
		   recipePromise.then(recipe => {
			   recipes[selectionIndex] = recipe.meals[0];
			   if(!recipeResultsHdr.children.length) {
				   if(recResContents.length > 1) {
					  tabs = new Tabs(recResContents, function(_, tabIndex) {
						  setRecipeResult(recipeResults.children[1], recipes[tabIndex-1]); 
					  });  
					  tabs.setStyle(); 
					  recipeResultsHdr.appendChild(tabs.tabsGroup);
				   }
			   }
			   setRecipeResult(recipeResults.children[1], recipes[0]); 
		   }).catch(err => console.error(err));
	   });
	   categoryResults.classList.add("hidden");
	   recipeResults.classList.remove("hidden");
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
   const categoryResultsBtnGroup = createBtnGroup("category-results-btn-group", [categoryResultsPrevBtn, categoryResultSelectBtn, categoryResultsNextBtn]);

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
