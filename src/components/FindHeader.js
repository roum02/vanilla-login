import BasicComponent from "./BasicComponent";

export default class FindHeader extends BasicComponent {
  template() {
    return `
      <div class="header__wrapper">
        <h1><span class="header__img-wrapper">
        <img src="https://contents.albamon.kr/monimg/gnb/bi/h_logo.png" alt="logo">
        </span>회원가입</h1>
        <ul class="header__menu-wrapper">
            <li class=""><a>홈</a></li>
            <li><a>채용정보</a></li>
            <li><a>인재정보</li>
            <li><a>알바토크</a></li>
            <li><a>FAQ</a></li>
            <li><a>캠페인</a></li>
        </ul>
      </div>
        <ul class="header__menu--find">
            <li><a>아이디 찾기</a></li>
            <li><a>비밀번호 찾기</a></li>
        </ul>
        `;
  }
}
