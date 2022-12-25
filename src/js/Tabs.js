import Tab from "./Tab.js";
import { createBtnGroup } from "./DOMutils.js";

class Tabs {
    #tabs = [];
    #tabs_group;

    constructor(properties, outlet) {
	    for(let tabIndex = 1; tabIndex <= properties.length; tabIndex++) {                              
		   const _this = this;
		   const tab = new Tab("tabs-hdr-btn-group-btn", "btn", function() {
			   for(const tab of _this.#tabs) {
				   if(tab == this) {
				       tab.classList.add("enabled");
					   tab.style.zIndex = 100;
					   tab.style.width = "35%";
					   tab.style.height = "100%";
					   outlet.textContent = properties[tabIndex-1].content;
				   }
				   else {
					  tab.classList.remove("enabled");
					  tab.style.width = `${65/(properties.length-1)}%`;
				   }
			   }
		   });
		   tab.text = properties[tabIndex-1].text;
		   if(properties[tabIndex-1].enabled) {
			  tab.tab.classList.add("enabled");
			  outlet.textContent = properties[tabIndex-1].content;
		   }
		   if(tab.tab.classList.contains("enabled")) tab.width = "35%";
		   else tab.width = `${65/(properties.length-1)}%`;
      
	       this.#tabs = [...this.#tabs, tab.tab];
	    }
		this.#tabs_group = createBtnGroup("tabs-hdr-btn-group", this.#tabs);
	}

    get tabs() {
	    return this.#tabs;
	}

    get tabsGroup() {
	    return this.#tabs_group;
	}

    setStyle() {
	    for(const tab of this.#tabs) {
		    if(!tab.classList.contains("enabled")) {
			   tab.style.borderTopStyle = "solid";
			   tab.style.borderRightStyle = "solid";
			   tab.style.borderLeftStyle = "solid";
			   tab.style.borderBottomStyle = "solid";
			} else {
			   tab.style.borderRightStyle = "dotted";
			}
		}
	}
}

export default Tabs;
