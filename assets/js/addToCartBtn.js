// Add item info to notification
export function addChosenItemInfoToCart() {
  document.querySelector(".add-to-cart-btn")?.addEventListener("click", (e) => {
    const el = document.querySelector(".individual-item-number-of-item");
    const quantity = +el.innerHTML;
    const price = document.querySelector(".individual-item-price").textContent;
    const productName = el.id;

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

    // Display notification
    const notificationBtn = document.querySelector("#notifications-btn");
    if (notificationBtn.classList.contains("empty")) {
      notificationBtn.classList.remove("empty");
    }
  });
}
