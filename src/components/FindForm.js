import BasicComponent from "./BasicComponent";
import { historyRouterPush } from "../utils/routers";
import { handleNoResPost, handlePost } from "../api";

export default class FindHeader extends BasicComponent {
  template() {
    return `
    <ul class="main__description">
        <li>비밀번호 찾기 방법을 선택해 주세요</li>
    </ul>

    <div class="main__choice-wrapper">
        <div class="main__choice-item">
        <label>
      <input class="main__radio--phone" route="/findPassword" type="radio" checked name="way">
            휴대폰번호로 찾기
        </label>
        </div>
        <div class="main__choice-item">
        <label>
            <input class="main__radio--email" route="/findEmail" type="radio" name="way">
           이메일로 찾기
        </label>
        </div>
        <div class="main__choice-item">
        <label>
            <input class="main__radio--mine" route="/findMyPhone" type="radio" name="way">
            본인 명의 휴대전화로 찾기
        </label>
        </div>
        <div class="main__choice-item">
        <label>
            <input class="main__radio--ipin" route="/findIPIN" type="radio" name="way">
            아이핀(I-PIN)으로 찾기
        </label>
        </div>
        <div class="main__choice-item">
        <label>
            <input class="main__radio--temp" route="/findTemp" type="radio" name="way">
            임시비밀번호 신청
        </label>
        </div>
    </div>

    <div class="main__input-wrapper">
    <div class="main__input-description">
      회원정보에 등록된 연락처로 비밀번호를 찾을 수 있습니다.
    </div>
<div class="main__input-form">
    <div class="main__input-item">
        <div class="main__input-title">아이디</div>
        <div class="main__input-box">
            <input class="main__input--fulled main__input" 
            placeholder="아이디입력"
            id="input__id--phone">
        </div>
    </div>
    <div class="main__input-item">
        <div class="main__input-title">이름</div>
        <div class="main__input-box">
            <input class="main__input--fulled main__input" 
            placeholder="가입자명"
            id="input__name--phone"
            >
        </div>
    </div>
    <div class="main__input-item">
        <div class="main__input-title">휴대폰번호</div>
        <div class="main__input-box">
            <select class="main__input" id="main__select--phone">
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
            </select>
            <input class="main__input main__input-select"
            id="input__phone--phone"
            >
            <button type="button" class="main__input-btn--auth">인증</button>
        </div>
    </div>
    <div class="main__input-item" id="main__input--certification">
      <div class="main__input-title">인증번호</div>
      <div class="main__input-box">
          <input class="main__input--fulled main__input" 
          placeholder="인증번호 6자리"
          id="input__certification--phone"
          >
      </div>
    </div>
</div>
</div>
    <div class="main__btn-wrapper">
      <div class="main__btn--next" route="/newPassword">다음</div>
    </div>
    `;
  }
  setEvent() {
    const { findPasswordInfo } = this.props;
    let currentLink;

    this.addEvent("click", ".main__radio--phone", (e) => {
      const pathName = e.target.getAttribute("route");
      window.history.pushState({}, pathName, window.location.origin + pathName);
      window.location.reload();
    });

    const handleRouter = (e) => {
      const pathName = e.target.getAttribute("route");
      historyRouterPush(pathName, ".main__input-wrapper");
      currentLink = pathName;
      //console.log(currentLink);
    };

    this.addEvent("click", ".main__radio--email", (e) => {
      handleRouter(e);
    });

    this.addEvent("click", ".main__radio--mine", (e) => {
      handleRouter(e);
    });

    this.addEvent("click", ".main__radio--ipin", (e) => {
      handleRouter(e);
    });

    this.addEvent("click", ".main__radio--temp", (e) => {
      handleRouter(e);
    });
  }
}
