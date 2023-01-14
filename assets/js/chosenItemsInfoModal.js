import { countNumOfItems } from "./countNumOfItems.js";

// Create modal for chosen product info to buy
const headerNotification = document.querySelector(".header-notification");
const header = document.querySelector("header");
const body = document.querySelector("body");
let chosenProductModalWrapper = "";
const notificationBtn = document.querySelector("#notifications-btn");

const getImagePath = (productShortFullName) => {
  if (header.classList.contains("sub-page")) {
    return `../assets/images/product-${productShortFullName}/mobile/image-product.jpg`;
  } else if (header.classList.contains("checkout-page")) {
    return `../assets/images/product-${productShortFullName}/mobile/image-product.jpg`;
  } else {
    return `./assets/images/product-${productShortFullName}/mobile/image-product.jpg`;
  }
};

const chosenProductImage = (productName) => {
  const productShortName = productName.split("-")[0];

  switch (productShortName) {
    case "xx59":
      return getImagePath(`${productShortName}-headphones`);
    case "xx99":
      return productName === "xx99-mark-I"
        ? getImagePath(`${productShortName}-mark-one-headphones`)
        : getImagePath(`${productShortName}-mark-two-headphones`);
    case "yx1":
      return getImagePath(`${productShortName}-earphones`);
    case "zx7":
      return getImagePath(`${productShortName}-speaker`);
    case "zx9":
      return getImagePath(`${productShortName}-speaker`);
  }
};

const createChosenProductModal = () => {
  const modalDiv = document.createElement("div");
  modalDiv.className = "chosen-product-modal-wrapper";
  modalDiv.innerHTML = `<div class="chosen-product-modal"></div>`;
  header.appendChild(modalDiv);
};

const removeModal = () => {
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
};

const getCartIconImgPath = () => {
  if (header.classList.contains("sub-page")) {
    return `../assets/images/icon-cart.svg `;
  } else if (header.classList.contains("checkout-page")) {
    return `../assets/images/icon-cart.svg `;
  } else {
    return `./assets/images/icon-cart.svg`;
  }
};

const removeAllChosenItems = () => {
  const removeChosenItems = document.querySelector(".remove-all-btn");

  removeChosenItems?.addEventListener("click", () => {
    localStorage.removeItem("products");
    notificationBtn.dataset["count"] = 0;

    notificationBtn.classList.add("empty");
    document.querySelector(
      ".chosen-product-modal"
    ).innerHTML = `<div class="empty-basket"><p> Your cart is empty</p> <img src=${getCartIconImgPath()} alt="basket"> </div>`;
  });
};

function removeObjectWithId(arr, productName) {
  const objWithIdIndex = arr.findIndex(
    (obj) => obj.productName === productName
  );

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}

const removeItemInfo = (productName) => {
  const removeZeroAmountItems = document.querySelector(
    `.${productName}-wrapper`
  );

  removeZeroAmountItems.remove();
};

const chosenProductModalDecrease = () => {
  const decreaseBtns = document.querySelectorAll(
    ".chosen-product-decrease-btn"
  );

  decreaseBtns.forEach((decreaseBtn) => {
    decreaseBtn.addEventListener("click", (e) => {
      // Decrease number  of items in header cart
      let cartNumberOfItem = +document.querySelector(
        ".cart-amount-of-chosen-product"
      ).textContent;
      document.querySelector(".cart-amount-of-chosen-product").textContent =
        cartNumberOfItem - 1;
      console.log(cartNumberOfItem);

      let totalPrices = +document
        .querySelector(".chosen-products-cost-amount-total")
        .textContent.split(",")
        .join("");

      const chosenProductName = e.currentTarget.id;
      let storedArray = JSON.parse(localStorage.getItem("products"));
      let chosenProduct = storedArray.find(
        (el) => el.productName === chosenProductName
      );

      // Change quantity
      chosenProduct.quantity -= 1;
      let numberToDecrease = +e.currentTarget.nextElementSibling.textContent;
      numberToDecrease--;
      chosenProduct.quantity === 0
        ? (removeObjectWithId(storedArray, chosenProduct.productName),
          removeItemInfo(chosenProduct.productName))
        : null;
      localStorage.setItem("products", JSON.stringify(storedArray));

      e.currentTarget.nextElementSibling.textContent = numberToDecrease;

      // Change total price
      totalPrices -= +chosenProduct.price;
      document.querySelector(".chosen-products-cost-amount-total").textContent =
        totalPrices;

      // Decrease notification amount

      notificationBtn.dataset["count"] = +notificationBtn.dataset["count"] - 1;

      // Hide notification when there's no item chosen
      const storedArray2 = JSON.parse(localStorage.getItem("products"));
      storedArray2.length ? null : notificationBtn.classList.add("empty");
    });
  });
};

const chosenProductModalIncrease = () => {
  const increaseBtns = document.querySelectorAll(
    ".chosen-product-increase-btn"
  );

  increaseBtns.forEach((increaseBtn) => {
    increaseBtn.addEventListener("click", (e) => {
      // Increase number  of items in header cart
      let cartNumberOfItem = +document.querySelector(
        ".cart-amount-of-chosen-product"
      ).textContent;
      document.querySelector(".cart-amount-of-chosen-product").textContent =
        cartNumberOfItem + 1;

      let totalPrices = +document
        .querySelector(".chosen-products-cost-amount-total")
        .textContent.split(",")
        .join("");

      const chosenProductName = e.currentTarget.id;
      let storedArray = JSON.parse(localStorage.getItem("products"));
      let chosenProduct = storedArray.find(
        (el) => el.productName === chosenProductName
      );

      // Increase quantity
      chosenProduct.quantity += 1;
      e.currentTarget.previousElementSibling.textContent =
        chosenProduct.quantity;
      localStorage.setItem("products", JSON.stringify(storedArray));

      // Increase total price
      totalPrices += +chosenProduct.price;
      document.querySelector(".chosen-products-cost-amount-total").textContent =
        totalPrices;

      // Increase notification amount
      notificationBtn.dataset["count"] = +notificationBtn.dataset["count"] + 1;
    });
  });
};

export function chosenItemsInfoModal() {
  headerNotification.addEventListener("click", () => {
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
          <div class="chosen-product-info-img"> <img <img src=${chosenProductImage(
            productName
          )} alt="${productName}"></div>
          <div> 
            <div>${productName.replaceAll("-", "")}</div>
            <p>${price}</p>
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
        <button class="chechout-button button-primary">CHECKOUT</button>
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
