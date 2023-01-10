import { addChosenItemsNumber } from "./addChosenItems.js";

// Create modal for chosen product info to buy
const headerNotification = document.querySelector(".header-notification");
const header = document.querySelector("header");
const body = document.querySelector("body");
let chosenProductModalWrapper = "";
const notificationNumberOfItems = document.querySelector("#notifications-btn");

export function chosenItemsInfoModal() {
  headerNotification.addEventListener("click", () => {
    const chosenItemsInfo = JSON.parse(localStorage.getItem("products"));

    body.classList.add("hide-scroll");

    const modalDiv = document.createElement("div");
    modalDiv.className = "chosen-product-modal-wrapper";
    modalDiv.innerHTML = `<div class="chosen-product-modal"></div>`;
    header.appendChild(modalDiv);

    // Check if items are chosen
    if (chosenItemsInfo?.length) {
      // Count number of item for Cart
      const numberOfItemArr = chosenItemsInfo?.map((el) => {
        return el.quantity;
      });

      const numberOfItem = numberOfItemArr?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0);

      const modalProductModal = document.querySelector(".chosen-product-modal");
      modalProductModal.innerHTML = `
      <h3 class="chosen-product-modal-header">
        CART(<span class="amoun-of-chosen-product">${numberOfItem}</span>)
        <button class="remove-all-btn">Remove All</button>
      </h3>
      <ul class="chosect-products">
        <li class="chosen-product">
          <div class="chosen-product-info">
          <div class="chosen-product-info-img"> <img src=${
            header.classList.contains("sub-page")
              ? `../assets/images/product-zx7-speaker/mobile/image-product.jpg `
              : header.classList.contains("checkout-page")
              ? `../assets/images/product-zx7-speaker/mobile/image-product.jpg `
              : `./assets/images/product-zx7-speaker/mobile/image-product.jpg `
          } alt="me"></div>
          <div> 
            <div>XX99 MK II</div>
            <p>$ 2,999</p>
          </div>
          </div>
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
      <div class="chosen-products-cost">
        <p class="chosen-products-cost-text">TOTAL</p>
        <p class="chosen-products-cost-amount">$ 2,999</p>
      </div>
      
      <a href=${
        header.classList.contains("sub-page")
          ? "./checkout.html"
          : header.classList.contains("checkout-page")
          ? "checkout.html"
          : "./IndividualItemsPages/checkout.html"
      }> 
        <button class="chechout-button button-primary">CHECKOUT</button>
      </a>`;

      // Remove Chosen Items
      const removeChosenItems = document.querySelector(".remove-all-btn");

      removeChosenItems?.addEventListener("click", () => {
        localStorage.removeItem("products");
        notificationNumberOfItems.dataset["count"] = 0;

        const notificationBtn = document.querySelector("#notifications-btn");
        notificationBtn.classList.add("empty");
        document.querySelector(
          ".chosen-product-modal"
        ).innerHTML = `<div class="empty-basket"><p> Your cart is empty</p> <img src=${
          header.classList.contains("sub-page")
            ? `../assets/images/icon-cart.svg `
            : header.classList.contains("checkout-page")
            ? `../assets/images/icon-cart.svg `
            : `./assets/images/icon-cart.svg `
        } alt="me"> </div>`;
        addChosenItemsNumber();
      });
    } else {
      document.querySelector(".chosen-product-modal").innerHTML = `
        <div class="empty-basket"><p> Your cart is empty</p> <img src=${
          header.classList.contains("sub-page")
            ? `../assets/images/icon-cart.svg `
            : header.classList.contains("checkout-page")
            ? `../assets/images/icon-cart.svg `
            : `./assets/images/icon-cart.svg `
        } alt="basket"></div>`;

      header.appendChild(modalDiv);
    }

    // Remove modal
    chosenProductModalWrapper = document.querySelector(
      ".chosen-product-modal-wrapper"
    );

    chosenProductModalWrapper
      ? chosenProductModalWrapper.addEventListener("click", () => {
          chosenProductModalWrapper.remove();
          body.classList.remove("hide-scroll");
        })
      : null;

    document
      .querySelector(".chosen-product-modal")
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
      });
  });
}
