import BasicComponent from "../components/BasicComponent";
import FindHeader from "../components/FindHeader";
import FindForm from "../components/FindForm";
import FindNewPassword from "../components/FindNewPassword";
import ChoiceBtn from "../components/ChoiceBtn";
import handleTabClass from "../utils/handleTabClass";
import { handleNoResPost, handlePost } from "../api";

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

    {
      currentLink == "/findPassword"
        ? new FindForm(formInput, {
            findPasswordInfo: findPasswordInfo.bind(this),
          })
        : currentLink == "/newPassword"
        ? new FindNewPassword(formInput, {})
        : "";
    }

    //임시
    //new FindForm(formInput, { findPasswordInfo: findPasswordInfo.bind(this) });

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
    this.addEvent("click", ".main__input-btn--auth", (e) => {
      e.preventDefault();
      let num = document.querySelector("#main__input--certification");
      num.style.display = "flex";
      const currentLink = window.location.pathname;

      let id;
      let name;
      let email;
      let phone;
      let idx;
      {
        currentLink == "/findPassword"
          ? ((id = document.getElementById("input__id--phone").value),
            (name = document.getElementById("input__name--phone").value),
            (phone = document.getElementById("input__phone--phone").value),
            handlePost("auth/company/check-pw-by-phone", {
              userId: id,
              userName: name,
              userPhoneNumber: `010${phone}`,
            })
              .then((data) => {
                idx = data.data.id;
                //findPasswordInfo(id, name, phone, idx);
              })
              .catch((error) => console.log(error)))
          : currentLink == "/findEmail"
          ? ((id = document.getElementById("input__id--email").value),
            (name = document.getElementById("input__name--email").value),
            (email = document.getElementById("input__email--email").value),
            handlePost("auth/company/sendEmail", {
              userId: id,
              userName: name,
              email: email,
            })
              .then((data) => {
                console.log(data);
                //findPasswordInfo(id, name, email);
                //console.log(findPasswordInfo);
              })
              .catch((error) => console.log(error)))
          : "";
      }
    });

    this.addEvent("click", ".main__btn--next", (e) => {
      const currentLink = window.location.pathname;
      const pathName = e.target.getAttribute("route"); //newpassword
      currentLink == "/findPassword"
        ? handleNoResPost(
            "auth/common/check/sendSMS",
            {
              phoneNumber: `010${
                document.getElementById("input__phone--phone").value
              }`,
              //phoneNumber: "01054002028",
              code: document.getElementById("input__certification--phone")
                .value,
            }
              .then(() => {
                window.history.pushState(
                  {},
                  pathName,
                  window.location.origin + pathName
                );
                window.location.reload();
              })
              .catch((error) => console.log(error))
          )
        : currentLink == "/findEmail"
        ? (handleNoResPost("auth/common/check/sendEmail", {
            //email: "dmswl7850@gmail.com",
            email: document.getElementById("input__email--email").value,
            code: document.getElementById("input__certification--email").value,
          })
            .then(() => {
              window.history.pushState(
                {},
                pathName,
                window.location.origin + pathName
              );
              window.location.reload();
            })
            .catch((error) => console.log(error)),
          console.log(this.state.findPasswordInfo))
        : "";
    });
  }
}
