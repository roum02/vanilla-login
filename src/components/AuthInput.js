import BasicComponent from "./BasicComponent";
import clickBodyEvent from "../utils/clickBodyEvent";
import { handlePost } from "../api";
import { historyRouterPush } from "../utils/routers";

export default class AuthInput extends BasicComponent {
  template() {
    return `
    <div class="auth__input-box auth__input-box--id">
        <input type="text" id="auth__input-id" class="auth__input" placeholder="아이디" />
    </div>   
    <div class="auth__input-box auth__input-box--pw">
        <input type="password" id="auth__input-pw" class="auth__input" placeholder="비밀번호" />
    </div>   
        <button type="button" class="auth__login-btn" route="/mainPage">로그인</button>
    `;
  }

  setEvent() {
    const { infoItem } = this.props;

    this.addEvent("click", ".auth__login-btn", (e) => {
      const id = document.getElementById("auth__input-id").value;
      const password = document.getElementById("auth__input-pw").value;
      const pathName = e.target.getAttribute("route");

      {
        infoItem(id, password)
          ? handlePost("auth/job-seeker/login", {
              userId: id,
              password: password,
            })
              .then((data) => {
                console.log(data);
                const idx = data.data.id;
                const nickname = data.data.nickname;
                alert("개인회원으로 로그인 되었습니다. ");
                infoItem(id, password, idx);
                historyRouterPush(pathName, ".body__login-wrapper");
                // window.history.pushState(
                //   {},
                //   pathName,
                //   window.location.origin + pathName
                // );
                // document.querySelector(".body__login-wrapper").innerHTML = `
                // <div>${nickname}님, <br /> 환영합니다!</div>
                // <p>별명을 바꾸고 싶다면 아래 버튼을
                // 클릭해주세요</p>
                // <div>별명 바꾸기</div> <div>다음에 할래요</div>
                // `;
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
                infoItem(id, password, data.data.id);
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
