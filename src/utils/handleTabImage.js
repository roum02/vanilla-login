export default function handleTabImage(isIndividual) {
  //let tabImg = document.querySelector(".auth__login-img");
  let tabImg = document.querySelector(".auth__login-sns");
  {
    !isIndividual
      ? (tabImg.style.display = "none")
      : (tabImg.style.display = "flex");
  }
  console.log(isIndividual);

  //let tabButtonList = document.querySelectorAll(".auth__tab-button");
  //       Array.prototype.forEach.call(tabButtonList, function (list) {
  //         list.addEventListener("click", function (e) {
  //           let tabImg = document.querySelector(".auth__login-img");

  //           {
  //             !isIndividual.isIndividual
  //               ? (tabImg.style.display = "none")
  //               : (tabImg.style.display = "block");
  //           }

  //           console.log(isIndividual.isIndividual);
  //         });
  //       });
}
