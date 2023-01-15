const header = document.querySelector("header");

// Path for chosen items images, by their name
const getImagePath = (productShortFullName) => {
  if (header.classList.contains("sub-page")) {
    return `../assets/images/product-${productShortFullName}/mobile/image-product.jpg`;
  } else if (header.classList.contains("checkout-page")) {
    return `../assets/images/product-${productShortFullName}/mobile/image-product.jpg`;
  } else {
    return `./assets/images/product-${productShortFullName}/mobile/image-product.jpg`;
  }
};

export const chosenProductImage = (productName) => {
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

//Cart icon path by location
export const getCartIconImgPath = () => {
  if (header.classList.contains("sub-page")) {
    return `../assets/images/icon-cart.svg `;
  } else if (header.classList.contains("checkout-page")) {
    return `../assets/images/icon-cart.svg `;
  } else {
    return `./assets/images/icon-cart.svg`;
  }
};
