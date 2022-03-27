import BasicComponent from "./BasicComponent";

export default class FindHeader extends BasicComponent {
  template() {
    const name = "사용자";
    return `
      <div>${name}님,
      <br>
      환영합니다!</div>
      <p>별명을 바꾸고 싶다면 아래 버튼을 클릭해주세요</p>
      <div>별명 바꾸기</div>
      <div>다음에 할래요</div>
        `;
  }
}
