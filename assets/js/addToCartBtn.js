import { countNumOfItems } from "./countNumOfItems.js";

const addToCartBtn = document.querySelector(".add-to-cart-btn");
const notificationNumberOfItems = document.querySelector("#notifications-btn");

// Add item info to notification
export function addChosenItemInfoToCart() {
  const chosenProductsInfo = JSON.parse(localStorage?.getItem("products"));

  const numberOfItem = countNumOfItems(chosenProductsInfo);

  if (notificationNumberOfItems) {
    notificationNumberOfItems.dataset["count"] = numberOfItem || 0;
  }

  addToCartBtn?.addEventListener("click", (e) => {
    const numberOfItem = document.querySelector(
      ".individual-item-number-of-item"
    );
    const quantity = +numberOfItem.innerHTML;
    const price = document
      .querySelector(".individual-item-price")
      .textContent.replace(/[^0-9.]/g, "");
    const productName = numberOfItem.id;

    let storedArray = JSON.parse(localStorage.getItem("products"));

    if (storedArray?.length) {
      const product = storedArray.find((el) => el.productName === productName);
      if (!product) {
        storedArray.push({
          quantity,
          price,
          productName,
        });
        localStorage.setItem("products", JSON.stringify(storedArray));
      } else {
        product.quantity += quantity;
        localStorage.setItem("products", JSON.stringify(storedArray));
      }
    } else {
      localStorage.setItem(
        "products",
        JSON.stringify([
          {
            quantity,
            price,
            productName,
          },
        ])
      );
    }

    let storedArray2 = JSON.parse(localStorage.getItem("products"));
    const numberOfItem2 = countNumOfItems(storedArray2);

    notificationNumberOfItems.dataset["count"] = numberOfItem2
      ? numberOfItem2
      : 0;

    // Display notification
    const notificationBtn = document.querySelector("#notifications-btn");
    if (notificationBtn.classList.contains("empty")) {
      notificationBtn.classList.remove("empty");
    }
  });
}

export function changeQuantityOfItem() {}
