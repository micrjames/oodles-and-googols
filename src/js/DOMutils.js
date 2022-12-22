const createSpan = function(text = null, idName = null, className = null) {
    const span = document.createElement("span");
    if(text) {
	   span.textContent = text;
	}
    if(idName) span.setAttAribute("id", idName);
    if(className) span.setAttribute("class", className);

    return span;
};

export { createSpan };
