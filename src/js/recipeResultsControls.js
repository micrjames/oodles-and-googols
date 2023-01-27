import { buildEl, createSpan, addIcon } from "./DOMutils.js";

const setRecipeResultControls = function(recipeResults) {
    const recipeResultControls = document.createElement("recipe-result-controls");
   
    const rRCpreamble = createSpan("serving for", "recipe-result-controls-preamble"); 
    recipeResultControls.appendChild(rRCpreamble);

    const rRCbtnGroup = buildEl("div", null, "recipe-result-controls-btn-group");
    recipeResultControls.appendChild(rRCbtnGroup);

    const rRCbtnGroupMinus = buildEl("button", "btn", "recipe-result-controls-btn-group-minus");
    addIcon(rRCbtnGroupMinus, "minus");
    recipeResultControls.appendChild(rRCbtnGroupMinus);
    
    const rRCbtnGroupCount = createSpan(null, "recipe-result-controls-btn-group-count");
    recipeResultControls.appendChild(rRCbtnGroupCount);

    const rRCbtnGroupPlus = buildEl("button", "btn", "recipe-result-controls-btn-group-plus");
    addIcon(rRCbtnGroupPlus, "plus");
    recipeResultControls.appendChild(rRCbtnGroupPlus);

    recipeResults.appendChild(recipeResultControls);
};

export { setRecipeResultControls };
