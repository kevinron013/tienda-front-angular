var checkoutBtn = document.getElementById("checkoutBtn");
var bg = document.getElementsByClassName("app-bg")[0];
var checkout = document.getElementsByClassName("app-checkout")[0];
var loaderWrapper = document.getElementsByClassName("loader-wrapper")[0];
var loader;

function killLoader() {
  loader = setTimeout(() => {
    loaderWrapper.classList.remove("visible");
    checkout.classList.add("visible");
    bg.style.pointerEvents = "auto";
  }, 2000);
}

checkoutBtn.addEventListener("click", function (evt) {
  bg.classList.add("visible");
  loaderWrapper.classList.add("visible");
  bg.style.pointerEvents = "none";

  killLoader();
});
bg.addEventListener("click", function (evt) {
  bg.classList.remove("visible");
  checkout.classList.remove("visible");
});

function cardFormat() {
  if ($(this).val().length > 4 && $(this).val().indexOf("-") === -1) {
    var format_card = $(this)
      .val()
      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4");
    $(this).attr("maxlength", 16);
    $(this).val(format_card);
    if (
      $(this).val() == "" ||
      $(this).val().match(format_card) ||
      $(this).val().length == 0
    ) {
      console.log("invalid");
    } else {
      console.log("valid");
    }
  } else {
    $(this).attr("maxlength", 19);
  }
}

$("#cardNumber").on("input blur", cardFormat); //<--use the function as a callback.
