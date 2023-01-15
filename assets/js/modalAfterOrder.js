import { addChosenItemInfoToCart } from "./addToCartBtn.js";

// Create modal after order
const continueAndPayBtn = document.querySelector(".continue-and-pay");
const header = document.querySelector(".header-wrapper");
const notificationBtn = document.querySelector("#notifications-btn");

export function createModalAfterOrder() {
  continueAndPayBtn?.addEventListener("click", () => {
    localStorage.removeItem("products");

    // Clear chosen items amount
    addChosenItemInfoToCart();
    notificationBtn?.classList.remove("empty");

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
          <li>
            <img
              src="../assets/images/product-xx59-headphones/mobile/image-product.jpg"
            />
            <div class="checkout-form-summary-list-col2">
              <p class="checkout-form-summary-list-product-name">
                XX99 MK II
              </p>
              <p
                class="checkout-form-summary-list-product-price"
              >
                $ 2,999
              </p>
            </div>
            <div class="checkout-form-summary-list-col3">
              <p
                class="checkout-form-summary-list-product-number"
              >
                x4
              </p>
            </div>
          </li>
        </ul>
      </div>
    <div class="total-spent-money">
      <h3>GRAND TOTAL</h3>
      <p>$ 5,446</p>
    </div>
    </div
    <button><a href="../index.html" class="button-primary back-to-home-btn" >BACK TO HOME</a></button>
</div>
`;

    header.appendChild(modalAfterOrder);
  });
}
