import "../src/assets/scss/main.scss";
import BasicComponent from "./components/BasicComponent";
import Login from "./pages/Login";
import FindPassword from "./pages/FindPassword";
import { saveLogin, getLogin } from "./utils/cookies";
import MainPage from "./pages/MainPage";

export default class App extends BasicComponent {
  template() {
    return `
    <div id="router"></div>
    `;
  }

  mounted() {
    const currentLink = window.location.pathname;
    const routerPage = this.target.querySelector("#router");

    {
      currentLink == "/"
        ? new Login(routerPage, {})
        : currentLink == "/findPassword"
        ? new FindPassword(routerPage, {})
        : currentLink == "/mainPage"
        ? new MainPage(routerPage, {})
        : new FindPassword(routerPage, {});
    }

    const passwordBtn = this.target.querySelector(".footer__btn--find-pw");
    {
      passwordBtn
        ? passwordBtn.addEventListener("click", (e) => {
            const pathName = e.target.getAttribute("route");
            historyRouterPush(pathName, "#router");
          })
        : "";
    }

    const historyRouterPush = (pathName, element) => {
      window.history.pushState({}, pathName, window.location.origin + pathName);
      new FindPassword(routerPage, {});
    };
  }
  setEvent() {
    window.onpopstate = function (e) {
      //history.back();
      window.location.reload();
      e.state ? console.log(`${JSON.stringify(e.state)}`) : "";
    };
  }
}
