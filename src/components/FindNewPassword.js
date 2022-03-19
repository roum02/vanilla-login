import BasicComponent from "./BasicComponent";

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
            <input class="main__input--fulled main__input" placeholder="8~16자, 영문/숫자/특수문자">
        </div>
    </div>
    <div class="main__input-item">
        <div class="main__input-title">새 비밀번호 확인</div>
        <div class="main__input-box">
            <input class="main__input--fulled main__input" placeholder="새 비밀번호 확인">
        </div>
    </div>
</div>
</div>
    <div class="main__btn-wrapper">
      <div class="main__btn--cancel">취소</div>
      <div class="main__btn--next">수정완료</div>
    </div>
    `;
  }
  setEvent() {}
}
