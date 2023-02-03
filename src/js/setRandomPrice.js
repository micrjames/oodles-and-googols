import Random from "./Random.js";
import { priceFormatter } from "./priceFormatter.js";

const setRandomPrice = function() {
   const randomDollars = new Random();
   const zeroOrOneRandomDollars = randomDollars.zeroOrOne;

   const randomCents = new Random(0, 100);
   const oneHundredRandomCents = randomCents.integer; 

   const randomPrice = `${zeroOrOneRandomDollars}.${oneHundredRandomCents}`;

   return randomPrice;
};

const adjustProductPrice = function(basePrice=0.0) {
   const productPrice = setRandomPrice();
   const adjustedProductPrice = basePrice + +productPrice;
   const formattedProductPrice = adjustedProductPrice.toString();

   return priceFormatter.format(formattedProductPrice);
};

export { adjustProductPrice };
