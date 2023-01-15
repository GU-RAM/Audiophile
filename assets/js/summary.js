import { countNumOfItems } from "./countNumOfItems.js";
import { chosenProductImage } from "./imagesPaths.js";

const header = document.querySelector("header");
const summaryParentDiv = document.querySelector(".checkout-main-form-summary");
const summaryListWrapper = document.querySelector(
  ".checkout-main-form-summary-list"
);
const checkouTotalPrice = document.querySelector(
  ".checkout-main-form-summary-prices-total"
);
const shipping = document.querySelector(
  ".checkout-main-form-summary-prices-shipping"
);
const vatTotal = document.querySelector(
  ".checkout-main-form-summary-prices-vat"
);
const grandTotal = document.querySelector(
  ".checkout-main-form-summary-prices-grand-total"
);

export function summary() {
  const chosenItemsInfo = JSON.parse(localStorage.getItem("products"));

  // Check if items are chosen
  if (chosenItemsInfo?.length && summaryListWrapper) {
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

    checkouTotalPrice.textContent = totalPrice;
    vatTotal.textContent = Math.round(totalPrice * 0.2);
    grandTotal.textContent = (
      totalPrice +
      Math.round(totalPrice * 0.2) +
      +shipping.textContent
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    summaryListWrapper.innerHTML = `
  <ul>
  ${chosenItemsInfo
    ?.map(
      ({ price, quantity, productName }) =>
        `<li>
        <img src=${chosenProductImage(productName)} alt="${productName}">
      <div class="checkout-main-form-summary-list-col2">
        <p class="checkout-main-form-summary-list-product-name">${productName.replaceAll(
          "-",
          ""
        )}</p>
        <p class="checkout-main-form-summary-list-product-price">$ ${price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      </div>
      <div class="checkout-main-form-summary-list-col3">
        <p >x <span class="checkout-main-form-summary-list-product-amount">${quantity}</span></p>
      </div>
    </li>`
    )
    .join("")}
  </ul>`;
  }
}
