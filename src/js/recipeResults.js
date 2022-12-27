import { createSpan, createListItem, removeChildren } from "./DOMutils.js";
import { recipeResults } from "./incs.js";
import { titleCase } from "./utils.js";

const createResultIngredientsList = function(meal) {                       
    const recipeResultIngredientsList = document.createElement("ul");       
    recipeResultIngredientsList.id = "recipe-result-ingredients-list";
    for(let i = 1; i <= 20; i++) {                                          
        const ingredientsText = meal[`strIngredient${i}`];
        const ingredientsMeasure = meal[`strMeasure${i}`];                                                
        if(ingredientsText && ingredientsMeasure) {
            const text = createSpan(ingredientsText);                                                   
			const measure = createSpan(ingredientsMeasure);
                             
			const recipeResultIngredientsListItem = createListItem([text, measure]); 
                             
			recipeResultIngredientsList.appendChild(recipeResultIngredientsListItem);
       }                      
    }                         
    return recipeResultIngredientsList;
}; 

const createResultInstructionsList = function(recipeInstructionsTextList, meal) {
    const instructionsText = meal.strInstructions;                                                      
    for(const instructionText of instructionsText.split(".")) {
	   if(instructionText) {
		   const recipeInstructionsTextSpan = createSpan(instructionText.trim());
		   const recipeInstructionsTextListItem = createListItem([recipeInstructionsTextSpan]);

		   recipeInstructionsTextList.appendChild(recipeInstructionsTextListItem);
	   }
    }
};

const setRecipeResult = function(recipeResult, meal) {
   const recipeResultTitle = recipeResult.children.namedItem("recipe-result-title");
   const recipeResultInstructions = recipeResult.children.namedItem("recipe-result-instructions");
   const recipeResultIngredients = recipeResult.children.namedItem("recipe-result-ingredients");
   
   const recipeResultImageThumb = recipeResult.children.namedItem("recipe-result-image-thumb");
   const recipeInstructionsTextList = recipeResultInstructions.children.namedItem("recipe-result-instructions-text-list");
    
   recipeResultIngredients.appendChild(createResultIngredientsList(meal));
   recipeResultImageThumb.src = meal.strMealThumb;                                         
   recipeResultTitle.textContent = titleCase(meal.strMeal);
   createResultInstructionsList(recipeInstructionsTextList, meal);
};

const resetRecipeResult = function(recipeResult) {
   const recipeResultTitle = recipeResult.children.namedItem("recipe-result-title");
   const recipeResultInstructions = recipeResult.children.namedItem("recipe-result-instructions");
   const recipeResultIngredients = recipeResult.children.namedItem("recipe-result-ingredients");
   
   const recipeResultImageThumb = recipeResult.children.namedItem("recipe-result-image-thumb");
   const recipeInstructionsTextList = recipeResultInstructions.children.namedItem("recipe-result-instructions-text-list");
    
   const recipeResultIngredientsList = recipeResultIngredients.children.namedItem("recipe-result-ingredients-list");
   removeChildren(recipeResultIngredientsList);
   recipeResultImageThumb.src = null;                                         
   recipeResultTitle.textContent = null;

   removeChildren(recipeInstructionsTextList);

   recipeResults.classList.add("hidden");
};

export { setRecipeResult, resetRecipeResult };
