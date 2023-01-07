const numberOfItemToBuy = document.querySelectorAll(
  ".individual-item-number-of-item"
);

//Define number of items user wants to buy
export function increaseItemsToBuy() {
  const increaseItemsToBuyBtn = document.querySelectorAll(
    ".individual-item-increase-number-of-item"
  );

  increaseItemsToBuyBtn.forEach((icreaseItemsBtns) => {
    icreaseItemsBtns.addEventListener("click", () => {
      numberOfItemToBuy.forEach((numberOfItemUserChoose) => {
        console.log(numberOfItemUserChoose.textContent);
        let currentNumberOfItem = +numberOfItemUserChoose.textContent;
        currentNumberOfItem++;
        numberOfItemUserChoose.textContent = currentNumberOfItem;
      });
    });
  });
}

// Decrease number of items user wants to buy
export function decreaseItemsToBuy() {
  const decreaseItemsToBuyBtn = document.querySelectorAll(
    ".individual-item-decrease-number-of-item"
  );

  decreaseItemsToBuyBtn.forEach((dereaseItemsBtns) => {
    dereaseItemsBtns.addEventListener("click", () => {
      numberOfItemToBuy.forEach((numberOfItemUserChoose) => {
        console.log(numberOfItemUserChoose.textContent);
        let currentNumberOfItem = +numberOfItemUserChoose.textContent;
        if (currentNumberOfItem - 1) {
          currentNumberOfItem--;
          numberOfItemUserChoose.textContent = currentNumberOfItem;
        }
      });
    });
  });
}
