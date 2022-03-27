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

    const formInput = this.target.querySelector(".form__input");
    const authTabWrapper = this.target.querySelector(".auth__tab-wrapper");
    const currentLink = window.location.pathname;

    {
      currentLink == "/findPassword"
        ? new FindForm(formInput, {
            findPasswordInfo: findPasswordInfo.bind(this),
          })
        : currentLink == "/newPassword"
        ? new FindNewPassword(formInput, {
            findPasswordInfo: findPasswordInfo.bind(this),
          })
        : "";
    }

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
    const { findPasswordInfo } = this.state;
    let idx;

    this.addEvent("click", ".main__input-btn--auth", (e) => {
      e.preventDefault();
      let num = document.querySelector("#main__input--certification");
      num.style.display = "flex";
      const currentLink = window.location.pathname;

      let id;
      let name;
      let email;
      let phone;
      //let idx;
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
              // userId: id,
              // userName: name,
              // email: email,
              userId: "company5",
              userName: "company5",
              email: "dmswl7850@gmail.com",
            })
              .then((data) => {
                console.log(data);
                idx = data.data.id;
                //findPasswordInfo(id, name, email);
              })
              .catch((error) => console.log(error)))
          : "";
      }
    });

    this.addEvent("click", ".main__btn--next", (e) => {
      const currentLink = window.location.pathname;
      const pathName = e.target.getAttribute("route");

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
        ? handleNoResPost("auth/common/check/sendEmail", {
            email: "dmswl7850@gmail.com",
            code: "crSXh23L",
            //email: document.getElementById("input__email--email").value,
            //code: document.getElementById("input__certification--email").value,
          })
            .then(() => {
              this.setState({
                findPasswordInfo: {
                  idx: idx,
                },
              });
              // console.log(this.state.findPasswordInfo);
              window.history.pushState(
                {},
                pathName,
                window.location.origin + pathName
              );
              window.location.reload();
            })
            .catch(
              (error) => console.log(error)
              //console.log(this.state.findPasswordInfo)
            )
        : "";
    });

    this.addEvent("click", ".main__btn--complete", (e) => {
      const newPassword = document.getElementById(
        "main__input--new-password"
      ).value;
      const confirmPassword = document.getElementById(
        "main__input--confirm-password"
      ).value;
      {
        newPassword == confirmPassword
          ? handlePut(5, {
              password: newPassword,
              checkPassword: confirmPassword,
            })
              .then((data) => {
                console.log(data);
                alert("비밀번호 변경이 완료되었습니다.");
              })
              .catch((error) => console.log(error))
          : alert(
              "비밀번호가 일치하지 않습니다. 다시 한번 확인 후 비밀번호를 입력해 주세요."
            );
      }
    });
  }
}
