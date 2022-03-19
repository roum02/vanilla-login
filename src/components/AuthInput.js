import BasicComponent from "./BasicComponent";
import clickBodyEvent from "../utils/clickBodyEvent";
import { handlePost } from "../api";

export default class AuthInput extends BasicComponent {
  template() {
    return `
    <div class="auth__input-box auth__input-box--id">
        <input type="text" id="auth__input-id" class="auth__input" placeholder="아이디" />
    </div>   
    <div class="auth__input-box auth__input-box--pw">
        <input type="password" id="auth__input-pw" class="auth__input" placeholder="비밀번호" />
    </div>   
        <button type="button" class="auth__login-btn">로그인</button>
    `;
  }

  setEvent() {
    const { infoItem } = this.props;

    this.addEvent("click", ".auth__login-btn", () => {
      const id = document.getElementById("auth__input-id").value;
      const password = document.getElementById("auth__input-pw").value;
      infoItem(id, password);

      // api fetching 부분
      {
        infoItem(id, password)
          ? handlePost("auth/job-seeker/login", {
              userId: id,
              password: password,
            })
              .then((data) => {
                console.log(data);
                alert("개인회원으로 로그인 되었습니다. ");
                infoItem(id, password);
              })
              .catch((error) => console.log(error))
          : handlePost("auth/company/login", {
              userId: id,
              password: password,
              deviceToken: id,
            })
              .then((data) => {
                console.log(data);
                alert("기업회원으로 로그인 되었습니다. ");
                infoItem(id, password);
              })
              .catch((error) => console.log(error));
      }
    });

    const body = document.querySelector("body");
    body.addEventListener("click", clickBodyEvent);

    this.addEvent("click", "#auth__input-id", () => {
      let inputId = document.querySelector(".auth__input-box--id");
      let inputPw = document.querySelector(".auth__input-box--pw");
      inputPw.style.borderBottom = "1px solid #e5e7ea";
      inputId.style.borderBottom = "1px solid #ff6633";
    });

    this.addEvent("click", "#auth__input-pw", () => {
      let inputId = document.querySelector(".auth__input-box--id");
      let inputPw = document.querySelector(".auth__input-box--pw");
      inputId.style.borderBottom = "1px solid #e5e7ea";
      inputPw.style.borderBottom = "1px solid #ff6633";
    });
  }
}
