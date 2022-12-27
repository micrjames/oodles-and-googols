import { fetchData } from "./fetchData.js";

// Return the provided string with the first letter of each word capitalized. Make sure the rest
// of the word is in lower case. For the purpose of this exercise, you should also capitalize connecting
// words like the and of.

const titleCase = function(str) {
	const strArr = str.split(' ');
    const titled = strArr.map(word => {
	    const upperStart = word[0].toUpperCase();
	   	const restWord = word.slice(1, word.length);
	    return upperStart + restWord.toLowerCase();
	}); 
    const titledStr = titled.join(' ');
    return titledStr;
};

const ignoreText = function(str, textToIgnore, breakText) {
   let slicedId = str.slice(textToIgnore.length);
   if(slicedId.includes("-")) slicedId = slicedId.split(breakText).join(" ");

   return slicedId;
};
const getRecipe = async function(mealId) {
    return await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`); 
};

const sortArray = function(array) {
    return array.sort(function(a, b){return a - b});
};

export { titleCase, ignoreText, getRecipe, sortArray };
