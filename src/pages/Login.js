import BasicComponent from "../components/BasicComponent";
import ImagePreload from "../components/ImagePreload";
import ChoiceBtn from "../components/ChoiceBtn";
import AuthInput from "../components/AuthInput";
import SaveId from "../components/SaveId";
import FooterMenu from "../components/FooterMenu";
import AuthImgBtns from "../components/AuthImgBtns";

import handleTabImage from "../utils/handleTabImage";
import handleTabClass from "../utils/handleTabClass";
import { saveLogin } from "../utils/cookies";

export default class Login extends BasicComponent {
  setup() {
    this.state = {
      isIndividual: true,
      info: {
        id: "",
        password: "",
      },
    };
  }

  template() {
    return `
    <div class="body__login-wrapper">
      <header data-component="header__logo-wrapper"></header>
      <main data-component="auth__wrapper">
          <div class="auth__tab-wrapper"></div>
          <div class="auth__login-wrapper"></div>
          <div class="auth__checkbox-wrapper">
                  <div class="auth__checkbox"></div>
                  <div class="auth__security-img-wrapper">IP보안<span class="auth__security-img-box"></span></div>
          </div>
          <ul class="auth__login-sns"></ul>  
      </main>
      <footer data-component="footer__btn-wrapper"></footer>
    </div>
      `;
  }

  mounted() {
    const { infoItem, tabBtnTrue, tabBtnFalse, infoSave } = this;
    const headerLogoWrapper = this.target.querySelector(
      "[data-component='header__logo-wrapper']"
    );

    const authWrapper = this.target.querySelector(
      "[data-component='auth__wrapper']"
    );
    const authTabWrapper = this.target.querySelector(
      '[class="auth__tab-wrapper"]'
    );
    const authLoginWrapper = this.target.querySelector(
      '[class="auth__login-wrapper"]'
    );
    const authLoginSns = this.target.querySelector('[class="auth__login-sns"]');

    const authCheckBox = this.target.querySelector('[class="auth__checkbox"]');

    const footerBtnWrapper = this.target.querySelector(
      "[data-component='footer__btn-wrapper']"
    );

    new ImagePreload(headerLogoWrapper, {});

    new ChoiceBtn(authTabWrapper, {
      tabBtnTrue: tabBtnTrue.bind(this),
      tabBtnFalse: tabBtnFalse.bind(this),
    });

    new AuthInput(authLoginWrapper, {
      infoItem: infoItem.bind(this),
    });

    new SaveId(authCheckBox, {
      infoSave: infoSave.bind(this),
    });

    new FooterMenu(footerBtnWrapper, {});
    new AuthImgBtns(authLoginSns, {});
  }

  infoItem(id, password) {
    const { info, isIndividual } = this.state;
    this.setState({
      isIndividual: isIndividual,
      info: {
        id: id,
        password: password,
      },
    });
    console.log(this.state);
    return isIndividual;
  }

  infoSave() {
    const { info } = this.state;
    const id = document.getElementById("auth__input-id").value;
    saveLogin(id);
  }

  tabBtnTrue() {
    let { isIndividual } = this.state;
    this.setState({
      isIndividual: true,
    });
    //isIndividual = this.state;
    handleTabImage(this.state.isIndividual);
    handleTabClass("individual");
  }

  tabBtnFalse() {
    let { isIndividual } = this.state;
    this.setState({
      isIndividual: false,
    });
    handleTabImage(this.state.isIndividual);
    handleTabClass("enterprise");
  }
}
