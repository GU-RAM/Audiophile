// Display main navigation by clicking hamburger
const hamburger = document.querySelector(".hamburger");
const body = document.querySelector("body");
const hamburgerNav = document.querySelector(".header-hamburger-nav");

export function displayNavigation() {
  hamburger.addEventListener("click", () => {
    hamburgerNav.classList.toggle("header-hamburger-nav-unhide");
    body.classList.toggle("hide-scroll");
    hamburger.querySelector("img").classList.add("hide");
  });
}
