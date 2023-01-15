const body = document.querySelector("body");
const notificationBtn = document.querySelector("#notifications-btn");
let chosenProductModalWrapper = "";

export const removeModal = () => {
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

export const removeAllChosenItems = () => {
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
