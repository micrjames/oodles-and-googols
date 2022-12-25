import { createBtn } from "./DOMutils.js";

class Tab {
    #tab;

    constructor(idName, className, cb) {
		this.#tab = createBtn(idName, className);
	    this.#tab.addEventListener("click", cb);
	}

    set text(value) {
	    this.#tab.textContent = value;
	}

    set width(value) {
	    this.#tab.style.width = value;
	}

    get tab() {
	    return this.#tab;
	}
    setBorder() {
	    if(this.#tab.disabled) {
            this.#tab.style.borderTopStyle = "solid";
            this.#tab.style.borderRightStyle = "solid";
            this.#tab.style.borderLeftStyle = "solid";
        }  
	}
}

export default Tab;
