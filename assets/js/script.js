import {
  increaseItemsToBuy,
  decreaseItemsToBuy,
} from "./changeNumberOfItem.js";
import { addChosenItemInfoToCart } from "./addToCartBtn.js";
import { chosenItemsInfoModal } from "./chosenItemsInfoModal.js";

// Display main navigation by clicking hamburger
const hamburger = document.querySelector(".hamburger");
const body = document.querySelector("body");

hamburger.addEventListener("click", () => {
  document
    .querySelector(".header-hamburger-nav")
    .classList.toggle("header-hamburger-nav-unhide");
  body.classList.toggle("hide-scroll");
});

//Display modal

// Go back to previous page
const goBackBtn = document.querySelectorAll(".go-back-btn");

goBackBtn.forEach((arr) => {
  arr.addEventListener("click", () => {
    history.back();
  });
});

//Define number of items user wants to buy
increaseItemsToBuy();

// Decrease number of items user wants to buy
decreaseItemsToBuy();

// Add item info to modal
addChosenItemInfoToCart();

// Create modal for chosen items info
chosenItemsInfoModal();
