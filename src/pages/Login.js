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
import { historyRouterPush } from "../utils/routers";
import { handlePost, handlePut } from "../api";

export default class Login extends BasicComponent {
  setup() {
    this.state = {
      isIndividual: true,
      info: {
        id: "",
        password: "",
        idx: "",
        accessToken: "",
        refreshToken: "",
      },
    };
  }

  template() {
    return `
    <div class="body__mainpage-wrapper">
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

  infoItem(id, password, idx, accessToken, refreshToken) {
    const { info, isIndividual } = this.state;
    this.setState({
      isIndividual: isIndividual,
      info: {
        id: id,
        password: password,
        idx: idx,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
    console.log(this.state.info);
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

  setEvent() {
    this.addEvent("click", ".main__content-btn--complete", () => {
      //console.log(this.state.info);
      let accessToken = this.state.info.accessToken;
      let refreshToken = this.state.info.refreshToken;
      let idx = this.state.info.idx;
      const nickName = document.getElementById("input__id--nickname").value;

      handlePut(
        `boards/${idx}/nickname`,
        {
          nickname: nickName,
        },
        {
          Authorization: `Bearer ${accessToken}`,
        }
      )
        .then((data) => {
          console.log(data);
          alert("닉네임 변경이 완료되었습니다.");
        })
        .catch((error) => {
          console.log(error);
          handlePost(
            "auth/common/reissue",
            {
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
            {
              Authorization: `Bearer ${accessToken}`,
            }
          )
            .then((data) => {
              console.log(data);
              accessToken = data.data.accessToken;
              refreshToken = data.data.refreshToken;
              alert("다시 시도해주세요.");
            })
            .catch((error) => console.log(error));
        });
    });
  }
}
