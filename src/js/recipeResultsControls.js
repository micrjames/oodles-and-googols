import { buildEl, createSpan, addIcon } from "./DOMutils.js";

const setRecipeResultControls = function(recipeResults) {
    const recipeResultControls = buildEl("div", "recipe-results-controls");
   
    const rRCpreamble = createSpan("serving for", "recipe-results-controls-preamble"); 
    recipeResultControls.appendChild(rRCpreamble);

    const rRCbtnGroup = buildEl("div", null, "recipe-results-controls-btn-group");
    recipeResultControls.appendChild(rRCbtnGroup);

    const rRCbtnGroupMinus = buildEl("button", "btn", "recipe-results-controls-btn-group-minus");
    addIcon(rRCbtnGroupMinus, "minus");
    rRCbtnGroup.appendChild(rRCbtnGroupMinus);
    
    const rRCbtnGroupCount = createSpan("0", "recipe-results-controls-btn-group-count");
    rRCbtnGroup.appendChild(rRCbtnGroupCount);

    const rRCbtnGroupPlus = buildEl("button", "btn", "recipe-results-controls-btn-group-plus");
    addIcon(rRCbtnGroupPlus, "plus");
    rRCbtnGroup.appendChild(rRCbtnGroupPlus);

    recipeResults.appendChild(recipeResultControls);
};

export { setRecipeResultControls };
