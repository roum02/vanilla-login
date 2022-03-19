import BasicComponent from "./BasicComponent";

export default class FooterMenu extends BasicComponent {
  template() {
    return `
            <a class="footer__btn--find-id" href="#">아이디 찾기</a>
            <a class="footer__btn--find-pw" route="/findPassword" href="#">비밀번호 찾기</a>
            <a class="footer__btn--join-us" href="#">회원가입</a>
        `;
  }
  setEvent() {}
}
