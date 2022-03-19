import preloadImages from "../utils/preload";
import logo from "../assets/images/popup_logo.png";
import securityOn from "../assets/images/btn_security_on.gif";
import snsShare from "../assets/images/snsShare.png";

function ImagePreload() {
  let images = [logo, securityOn, snsShare];

  function renderImage(parent, child, className) {
    const parentTag = document.querySelector(parent);
    const childImg = document.createElement("img");
    childImg.classList.add(className);
    childImg.setAttribute("src", child);
    parentTag.prepend(childImg);
  }

  preloadImages(images, function () {
    //console.log('All images were loaded');
  });

  renderImage("header", logo, "header__logo-img");
  renderImage(".auth__security-img-box", securityOn, "auth__security-img");

  //renderImage(".auth__login-sns", snsShare, "auth__login-img");
}

export default ImagePreload;
