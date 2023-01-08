// Create modal for chosen product info to buy
const basket = document.querySelector(".basket");
const header = document.querySelector("header");
const body = document.querySelector("body");
let chosenProductModalWrapper = "";

export function chosenItemsInfoModal() {
  basket.addEventListener("click", () => {
    // console.log("guro");
    const chosenItemsInfo = localStorage.getItem("products");

    body.classList.add("hide-scroll");

    if (chosenItemsInfo) {
      const modalDiv = document.createElement("div");
      modalDiv.className = "chosen-product-modal-wrapper";
      modalDiv.innerHTML = `
      <div class="chosen-product-modal">
      <h3 class="chosen-product-modal-header">
        CART<span class="amoun-of-chosen-product">0</span>
        <button>Remove All</button>
      </h3>
      <ul class="chosect-products">
        <li class="chosen-product">
          <div class="chosen-product-info"></div>
          <div class="amount-of-chosen-product">
            <div class="individual-item-defining-number-of-items">
              <button
                class="individual-item-decrease-number-of-item chosen-product-decrease"
              >
                <span>-</span>
              </button>
              <div class="individual-item-number-of-item">0</div>
              <button
                class="individual-item-increase-number-of-item chosen-product-increase"
              >
                <span>+</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="chosen-product-cost">
        <p class="chosen-product-cost-text">TOTAL</p>
        <p class="chosen-product-cost-amount">$</p>
      </div>
      
      <a href=${
        header.classList.contains("sub-page")
          ? "./checkout.html"
          : header.classList.contains("checkout-page")
          ? "#"
          : "./IndividualItemsPages/checkout.html"
      }> 
        <button class="chechout-button button-primary">CHECKOUT</button>
      </a>
      </div>`;

      header.appendChild(modalDiv);

      chosenProductModalWrapper = document.querySelector(
        ".chosen-product-modal-wrapper"
      );
    }

    chosenProductModalWrapper
      ? chosenProductModalWrapper.addEventListener("click", () => {
          chosenProductModalWrapper.remove();
          body.classList.remove("hide-scroll");
        })
      : null;
  });
}
