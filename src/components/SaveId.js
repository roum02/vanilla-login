import BasicComponent from "./BasicComponent";
import { saveLogin, getLogin } from "../utils/cookies";
import snsShare from "../assets/images/snsShare.png";

export default class SaveId extends BasicComponent {
  template() {
    return `
        <label><input type="checkbox" id="auth__checkbox--saveId" name="saveId" value="saveId">아이디저장</label>
        `;
  }
  setEvent() {
    const { infoSave } = this.props;
    window.onload = function () {
      //pop();
      getLogin();
      document.getElementById("individual").className =
        "auth__tab-button auth__tab--active";
    };

    function pop() {
      window.open(
        "/",
        "/",
        "width = 410, height = 635, top = 100, left = 200, location = no"
      );
    }

    this.addEvent("click", "#auth__checkbox--saveId", () => {
      let checkItem = document.getElementById("auth__checkbox--saveId");
      if (checkItem.checked) {
        console.log("checked");
        infoSave();
      } else if (!checkItem.checked) {
        saveLogin("");
      }
    });
  }
}
