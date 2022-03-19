import BasicComponent from "./BasicComponent";
import { handlePut } from "../api";

export default class FindHeader extends BasicComponent {
  template() {
    return `
    <ul class="main__description">
        <li>아래의 입력란에 새로운 비밀번호를 입력해 주세요.</li>
    </ul>

    <div class="main__input-wrapper">
<div class="main__input-form">
    <div class="main__input-item">
        <div class="main__input-title">새 비밀번호</div>
        <div class="main__input-box">
            <input id="main__input--new-password" class="main__input--fulled main__input" placeholder="8~16자, 영문/숫자/특수문자">
        </div>
    </div>
    <div class="main__input-item">
        <div class="main__input-title">새 비밀번호 확인</div>
        <div class="main__input-box">
            <input id="main__input--confirm-password" class="main__input--fulled main__input" placeholder="새 비밀번호 확인">
        </div>
    </div>
    <div class="main__input-item">
        <div class="main__input-title"></div>
        <div class="main__input-box">
            <a href="#" class="main__input--description">비밀번호 작성 도움말</a>
        </div>
    </div>
</div>
</div>
    <div class="main__btn-wrapper">
      <div class="main__btn--cancel">취소</div>
      <div class="main__btn--complete">수정완료</div>
    </div>
    `;
  }
  setEvent() {
    this.addEvent("click", ".main__btn--complete", () => {
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
