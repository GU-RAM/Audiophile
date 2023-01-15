import { countNumOfItems } from "./countNumOfItems.js";
import { chosenProductImage, getCartIconImgPath } from "./imagesPaths.js";
import {
  chosenProductModalDecrease,
  chosenProductModalIncrease,
} from "./quantityChangingModalBtns.js";
import { removeModal, removeAllChosenItems } from "./create&clearCartModal.js";

// Create modal for chosen product info to buy
const headerNotification = document.querySelector(".header-notification");
const header = document.querySelector("header");
const body = document.querySelector("body");

const createChosenProductModal = () => {
  const modalDiv = document.createElement("div");
  modalDiv.className = "chosen-product-modal-wrapper";
  modalDiv.innerHTML = `<div class="chosen-product-modal"></div>`;
  header.appendChild(modalDiv);
};

export function chosenItemsInfoModal() {
  headerNotification?.addEventListener("click", () => {
    const chosenItemsInfo = JSON.parse(localStorage.getItem("products"));

    body.classList.add("hide-scroll");

    createChosenProductModal();

    // Check if items are chosen
    if (chosenItemsInfo?.length) {
      // Count number of item for Cart
      const numberOfItem = countNumOfItems(chosenItemsInfo);

      // Array of prices of ind items
      const pricesArr = chosenItemsInfo?.map((product) => {
        return (
          product.price.replace(/\,/g, "").match(/\d+$/)[0] * product.quantity
        );
      });

      // Calculating total price
      const totalPrice = pricesArr?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0);

      const modalProductModal = document.querySelector(".chosen-product-modal");
      modalProductModal.innerHTML = `
      <h3 class="chosen-product-modal-header">
        CART(<span class="cart-amount-of-chosen-product">${numberOfItem}</span>)
        <button class="remove-all-btn">Remove All</button>
      </h3>
      <ul class="chosen-products-list">
     ${chosenItemsInfo
       ?.map(
         ({ price, quantity, productName }) =>
           `<li  class="chosen-product ${productName}-wrapper">
          <div class="chosen-product-info">
          <div class="chosen-product-info-img"> <img src=${chosenProductImage(
            productName
          )} alt="${productName}"></div>
          <div> 
            <div>${productName.replaceAll("-", "")}</div>
            <p>$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
          </div>
          <div class="amount-of-chosen-product">
            <div class="individual-item-defining-number-of-items">
              <button
                id="${productName}"
                class="chosen-product-decrease-btn individual-item-decrease-number-of-item"
              >
                <span>-</span>
              </button>
              <div class="individual-item-number-of-item amount-of-individual-chosen-product">${quantity}</div>
              <button
                id= "${productName}"
                class="chosen-product-increase-btn individual-item-increase-number-of-item"
              >
                <span>+</span>
              </button>
            </div>
          </div>
        </li>`
       )
       .join("")}
      </ul>
      <div class="chosen-products-cost">
        <p class="chosen-products-cost-text">TOTAL</p>
        <p class="chosen-products-cost-amount">$<span class="chosen-products-cost-amount-total">${totalPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
      </div>
      <div>
      <a href=${
        header.classList.contains("sub-page")
          ? "./checkout.html"
          : header.classList.contains("checkout-page")
          ? "checkout.html"
          : "./IndividualItemsPages/checkout.html"
      }> 
        <button class="checkout-button button-primary">CHECKOUT</button>
      </a></div>`;

      chosenProductModalDecrease();

      chosenProductModalIncrease();

      // Remove Chosen Items
      removeAllChosenItems();
    } else {
      document.querySelector(".chosen-product-modal").innerHTML = `
        <div class="empty-basket"><p> Your cart is empty</p> <img src=${getCartIconImgPath()} alt="yaryati"></div>`;
    }

    // Remove modal
    removeModal();
  });
}
