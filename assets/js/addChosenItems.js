// Notification, add chosen items number
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const notificationNumberOfItems = document.querySelector("#notifications-btn");

export function addChosenItemsNumber() {
  const chosenProductsInfo = JSON.parse(localStorage?.getItem("products"));

  const numberOfItemArr = chosenProductsInfo?.map((el) => {
    return el.quantity;
  });

  const numberOfItem = numberOfItemArr?.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);

  let count = numberOfItem ? numberOfItem : 0;
  notificationNumberOfItems.dataset["count"] = count ? count : 0;

  addToCartBtn?.addEventListener("click", () => {
    const currentPagenumberOfItem = +document.querySelector(
      ".individual-item-number-of-item"
    ).textContent;
    count += currentPagenumberOfItem;
    notificationNumberOfItems.dataset["count"] = count;
  });
}
