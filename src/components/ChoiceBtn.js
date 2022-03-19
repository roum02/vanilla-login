import BasicComponent from "./BasicComponent";

export default class ChoiceBtn extends BasicComponent {
  template() {
    return `
      <div type="button" class="auth__tab-button" id="individual">개인회원</div>
      <div type="button" class="auth__tab-button" id="enterprise">기업회원</div>
`;
  }

  setEvent() {
    const { tabBtnTrue, tabBtnFalse } = this.props;
    //const authTabBtns = this.target.getElementsByClassName("auth__tab-button");

    this.addEvent("click", "#individual", () => {
      tabBtnTrue();
    });

    this.addEvent("click", "#enterprise", () => {
      tabBtnFalse();
    });

    // Array.from(authTabBtns).forEach(function (authTabBtn) {
    //   authTabBtn.addEventListener("click", handleTabBtn);
    // });
  }
}
