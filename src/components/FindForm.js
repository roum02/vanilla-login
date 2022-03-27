import BasicComponent from "./BasicComponent";
import { historyRouterPush } from "../utils/routers";
import { handleNoResPost, handlePost, handlePut } from "../api";

export default class FindHeader extends BasicComponent {
  template() {
    return `
    <div class="main__form-wrapper">
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
      </div>
    `;
  }
  setEvent() {
    const { findPasswordInfo } = this.props;
    let currentLink;
    let idx;

    this.addEvent("click", ".main__radio--phone", (e) => {
      const pathName = e.target.getAttribute("route");
      window.history.pushState({}, pathName, window.location.origin + pathName);
      window.location.reload();
    });

    const handleRouter = (e, wrapper) => {
      const pathName = e.target.getAttribute("route");
      historyRouterPush(pathName, wrapper);
      currentLink = pathName;
    };

    this.addEvent("click", ".main__radio--email", (e) => {
      handleRouter(e, ".main__input-wrapper");
    });

    this.addEvent("click", ".main__radio--mine", (e) => {
      handleRouter(e, ".main__input-wrapper");
    });

    this.addEvent("click", ".main__radio--ipin", (e) => {
      handleRouter(e, ".main__input-wrapper");
    });

    this.addEvent("click", ".main__radio--temp", (e) => {
      handleRouter(e, ".main__input-wrapper");
    });

    this.addEvent("click", ".main__input-btn--auth", (e) => {
      let num = document.querySelector("#main__input--certification");
      num.style.display = "flex";

      let id;
      let name;
      let email;
      let phone;

      {
        currentLink == "/findPassword"
          ? ((id = document.getElementById("input__id--phone").value),
            (name = document.getElementById("input__name--phone").value),
            (phone = document.getElementById("input__phone--phone").value),
            handlePost("auth/job-seeker/check-pw-by-phone", {
              userId: id,
              userName: name,
              userPhoneNumber: `010${phone}`,
            })
              .then((data) => {
                alert(
                  "휴대폰으로 인증번호가 발송되었습니다. 4분 내 인증번호를 입력해 주세요."
                );
                console.log(data);
                idx = data.data.id;
              })
              .catch((error) => {
                alert(
                  "회원가입 시 회원정보에 등록한 이름, 이메일 주소와 동일하게 입력하셔야 인증번호를 받을 수 있습니다."
                );
                console.log(error);
              }))
          : currentLink == "/findEmail"
          ? ((id = document.getElementById("input__id--email").value),
            (name = document.getElementById("input__name--email").value),
            (email = document.getElementById("input__email--email").value),
            handlePost("auth/job-seeker/sendEmail", {
              userId: id,
              userName: name,
              email: email,
            })
              .then((data) => {
                alert(
                  "이메일로 인증번호가 발송되었습니다. 4분 내 인증번호를 입력해 주세요."
                );
                console.log(data);
                idx = data.data.id;
              })
              .catch((error) => {
                alert(
                  "회원가입 시 회원정보에 등록한 이름, 이메일 주소와 동일하게 입력하셔야 인증번호를 받을 수 있습니다."
                );
                console.log(error);
              }))
          : "";
      }
    });

    this.addEvent("click", ".main__btn--next", (e) => {
      const currentLink = window.location.pathname;

      currentLink == "/findPassword"
        ? handleNoResPost(
            "auth/common/check/sendSMS",
            {
              phoneNumber: `010${
                document.getElementById("input__phone--phone").value
              }`,
              code: document.getElementById("input__certification--phone")
                .value,
            }
              .then(() => {
                alert("인증되었습니다.");
                handleRouter(e, ".main__form-wrapper");
              })
              .catch((error) => {
                alert("인증번호가 동일하지 않습니다.");
                console.log(error);
              })
          )
        : currentLink == "/findEmail"
        ? handleNoResPost("auth/common/check/sendEmail", {
            email: document.getElementById("input__email--email").value,
            code: document.getElementById("input__certification--email").value,
          })
            .then(() => {
              alert("인증되었습니다.");
              handleRouter(e, ".main__form-wrapper");
            })
            .catch((error) => {
              alert("인증번호가 동일하지 않습니다.");
              console.log(error);
            })
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
          ? handlePut(`auth/common/user/${idx}/password`, {
              password: newPassword,
              checkPassword: confirmPassword,
            })
              .then((data) => {
                console.log(data);
                alert("비밀번호 변경이 완료되었습니다.");
                window.history.pushState({}, "", window.location.origin);
                window.location.reload();
              })
              .catch((error) => console.log(error))
          : alert(
              "비밀번호가 일치하지 않습니다. 다시 한번 확인 후 비밀번호를 입력해 주세요."
            );
      }
    });
  }
}
