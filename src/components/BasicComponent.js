class BasicComponent {
  target;
  props;
  state;
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  mounted() {}
  template() {
    return "";
  }
  render() {
    this.target.innerHTML = this.template();
    this.mounted(); // render 후에 mounted 실행
    //this.setEvent();
  }
  setEvent() {}
  setState(newState) {
    this.state = newState;
    this.render();
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.target.querySelectorAll(selector)];
    //selector보다 더 하위 요소는 closest으로 처리
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}

export default BasicComponent;
