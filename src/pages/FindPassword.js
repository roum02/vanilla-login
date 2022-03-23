import BasicComponent from "../components/BasicComponent";
import FindHeader from "../components/FindHeader";
import FindForm from "../components/FindForm";
import FindNewPassword from "../components/FindNewPassword";
import ChoiceBtn from "../components/ChoiceBtn";
import handleTabClass from "../utils/handleTabClass";
import { handleNoResPost, handleGet } from "../api";

export default class FindPassword extends BasicComponent {
  setup() {
    this.state = {
      isIndividual: true,
      findPasswordInfo: {
        id: "",
        name: "",
        phone: "",
        email: "",
        idx: "",
      },
    };
  }

  template() {
    return `
        <header data-component="header__wrapper"></header>
        <main data-component="main__form__wrapper">
        <div class="main__form">
            <div class="auth__tab-wrapper"></div>
            <div class="form__input"></div>
        </div>
        </main>
        <footer data-component="footer__wrapper">
          © JOBKOREA LLC. All rights reserved.
        </footer>
        `;
  }
  mounted() {
    const { tabBtnTrue, tabBtnFalse, findPasswordInfo } = this;
    const headerWrapper = this.target.querySelector(
      '[data-component="header__wrapper"]'
    );

    const currentLink = window.location.pathname;
    const formInput = this.target.querySelector(".form__input");
    const authTabWrapper = this.target.querySelector(".auth__tab-wrapper");

    // {
    //   currentLink == "/findPassword"
    //     ? new FindForm(formInput, {
    //         //findPasswordInfo: findPasswordInfo.bind(this),
    //       })
    //     : currentLink == "/newPassword"
    //     ? new FindNewPassword(formInput, {})
    //     : "";
    // }

    //임시
    new FindForm(formInput, { findPasswordInfo: findPasswordInfo.bind(this) });

    new FindHeader(headerWrapper, {});
    new ChoiceBtn(authTabWrapper, {
      tabBtnTrue: tabBtnTrue.bind(this),
      tabBtnFalse: tabBtnFalse.bind(this),
    });
  }
  tabBtnTrue() {
    let { isIndividual } = this.state;
    this.setState({
      isIndividual: true,
    });
    //isIndividual = this.state;
    //handleTabImage(this.state.isIndividual);
    handleTabClass("individual");
  }

  tabBtnFalse() {
    let { isIndividual } = this.state;
    this.setState({
      isIndividual: false,
    });
    //handleTabImage(this.state.isIndividual);
    handleTabClass("enterprise");
  }

  findPasswordInfo(id, name, phone, email, idx) {
    const { findPasswordInfo } = this.state;
    this.setState({
      findPasswordInfo: {
        id: id,
        name: name,
        phone: phone,
        email: email,
        idx: idx,
      },
    });
    console.log(this.state.findPasswordInfo);
  }

  setEvent() {
    this.addEvent("click", ".main__btn--next", (e) => {
      const currentLink = window.location.pathname;
      const pathName = e.target.getAttribute("route");
      //window.history.pushState({}, pathName, window.location.origin + pathName);
      //window.location.reload();
      currentLink == "/findPassword"
        ? handleGet("auth/common/check/sendSMS", {
            phoneNumber: this.state.findPasswordInfo.phone,
            code: document.getElementById("input__certification--phone").value,
          })
        : document.getElementById("input__certification--email").value;
    });

    //console.log(phoneIdx);
  }
}
