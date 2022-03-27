import BasicComponent from "../components/BasicComponent";
import FindHeader from "../components/FindHeader";
import MainTitle from "../components/MainTitle";

export default class MainPage extends BasicComponent {
  setup() {}

  template() {
    return `
        <header data-component="header__wrapper"></header>
        <main data-component="main__form__wrapper">
        <div class="main__form">
            <div class="main__title--hello"></div>
        </div>
        </main>
        <footer data-component="footer__wrapper">
          © JOBKOREA LLC. All rights reserved.
        </footer>
      `;
  }

  mounted() {
    const headerWrapper = this.target.querySelector(
      '[data-component="header__wrapper"]'
    );
    const mainTitle = this.target.querySelector(".main__title--hello");

    new FindHeader(headerWrapper, {});
    new MainTitle(mainTitle, {});
  }
  setEvent() {}
}
