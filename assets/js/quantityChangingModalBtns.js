const notificationBtn = document.querySelector("#notifications-btn");

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

export const chosenProductModalDecrease = () => {
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

export const chosenProductModalIncrease = () => {
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
