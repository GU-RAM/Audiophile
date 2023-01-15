import { chosenProductImage } from "./imagesPaths.js";

// Create modal after order
const continueAndPayBtn = document.querySelector(".continue-and-pay");
const header = document.querySelector(".header-wrapper");
const grandTotal = document.querySelector(
  ".checkout-form-summary-prices-grand-total"
);

export function createModalAfterOrder() {
  continueAndPayBtn?.addEventListener("click", () => {
    const chosenItemsInfo = JSON.parse(localStorage.getItem("products"));

    // Check if items are chosen
    if (chosenItemsInfo?.length) {
      const modalAfterOrder = document.createElement("div");
      modalAfterOrder.className = "bought-product-info-wrapper";
      modalAfterOrder.innerHTML = `
    <div class="bought-product-info">
    <div id="tick-mark-wrapper"> 
      <div id="tick-mark"> </div> 
    </div> 
    <h2>THANK YOU <br />
    FOR YOUR ORDER</h2>
    <p class="message-to-user">You will receive an email confirmation shortly.</p>
    <div class="bought-products">
      <div class="bought-products-list checkout-form-summary-list">
        <ul>
        ${chosenItemsInfo
          ?.map(
            ({ price, quantity, productName }) =>
              `<li>
              <img src=${chosenProductImage(productName)} alt="${productName}">
              <div class="checkout-form-summary-list-col2">
                <p class="checkout-form-summary-list-product-name">
                ${productName.replaceAll("-", "")}
                </p>
                <p class="checkout-form-summary-list-product-price">$ ${price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
              <div class="checkout-form-summary-list-col3">
                <p class="checkout-form-summary-list-product-number">x${quantity}</p>
              </div>
            </li>`
          )
          .join("")}
        </ul>
      </div>
    <div class="total-spent-money">
      <h3>GRAND TOTAL</h3>
      <p>$ ${grandTotal.textContent}</p>
    </div>
    </div
    <button><a href="../index.html" class="button-primary back-to-home-btn" >BACK TO HOME</a></button>
</div>
`;

      header.appendChild(modalAfterOrder);
      localStorage.removeItem("products");
    }
  });
}
