const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  document
    .querySelector(".main-header-hamburger-nav")
    .classList.toggle("unhide");
});
