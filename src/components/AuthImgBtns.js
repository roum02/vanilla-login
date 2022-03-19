import BasicComponent from "./BasicComponent";

export default class AuthImgBtns extends BasicComponent {
  template() {
    return `
    <li class="auth__login-item auth__login-naver"></li>
    <li class="auth__login-item auth__login-kakao"></li>
    <li class="auth__login-item auth__login-facebook"></li>
    <li class="auth__login-item auth__login-google"></li>
    <!--
    <a href="http://localhost:8080/oauth2/authorization/google">test</a>
    --!>
    <li class="auth__login-item auth__login-apple"></li>
        `;
  }
  setEvent() {
    this.addEvent("click", ".auth__login-google", () => {
      "http://localhost:8080/oauth2/authorization/google";
    });
  }
}
