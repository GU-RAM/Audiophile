import {
  increaseItemsToBuy,
  decreaseItemsToBuy,
} from "./changeNumberOfItem.js";
import { addChosenItemInfoToCart } from "./addToCartBtn.js";
import { chosenItemsInfoModal } from "./chosenItemsInfoModal.js";
import { displayNavigation } from "./displayNavigationByHamburger.js";
import { createModalAfterOrder } from "./modalAfterOrder.js";
import { summary } from "./summary.js";

// Display main navigation by clicking hamburger
displayNavigation();

// Go back to previous page
const goBackBtn = document.querySelectorAll(".go-back-btn");

goBackBtn.forEach((arr) => {
  arr.addEventListener("click", () => {
    history.back();
  });
});

// Hide notification if items aren't chosen
const notificationBtn = document.querySelector("#notifications-btn");
const number = localStorage.getItem("products");

if (notificationBtn) {
  number?.length ? null : notificationBtn.classList.add("empty");
}

//Define number of items user wants to buy
increaseItemsToBuy();

// Decrease number of items user wants to buy
decreaseItemsToBuy();

// Add item info to modal
addChosenItemInfoToCart();

// Create modal for chosen items info
chosenItemsInfoModal();

// Display modal after order
createModalAfterOrder();

// Summary
summary();

// Checkout form bottom changing displayed info based on radio checked
if (
  document.querySelector('.checkout-form-radio-wrapper input[type="radio"]')
) {
  document
    .querySelectorAll('.checkout-form-radio-wrapper input[type="radio"]')
    .forEach((elem) => {
      elem.addEventListener("change", () => {
        document
          .querySelectorAll(".checkout-form-bottom div")
          .forEach((el) => el.classList.toggle("hide"));
      });
    });
}
