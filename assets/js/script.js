import {
  increaseItemsToBuy,
  decreaseItemsToBuy,
} from "./changeNumberOfItem.js";
import { addChosenItemInfoToCart } from "./addToCartBtn.js";
import { chosenItemsInfoModal } from "./chosenItemsInfoModal.js";
import { displayNavigation } from "./displayNavigationByHamburger.js";
import { addChosenItemsNumber } from "./addChosenItems.js";
import { createModalAfterOrder } from "./modalAfterOrder.js";

// Display main navigation by clicking hamburger
displayNavigation();

// Go back to previous page
const goBackBtn = document.querySelectorAll(".go-back-btn");

goBackBtn.forEach((arr) => {
  arr.addEventListener("click", () => {
    history.back();
  });
});

// Notification, add chosen items number
addChosenItemsNumber();

// Hide notification if items aren't chosen
const notificationBtn = document.querySelector("#notifications-btn");
const number = localStorage.getItem("products");

number?.length ? null : notificationBtn.classList.add("empty");

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
