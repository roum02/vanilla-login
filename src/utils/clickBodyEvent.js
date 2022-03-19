export default function clickBodyEvent(e) {
  let target = e.target;

  if (
    target == e.currentTarget.querySelector("#auth__input-id") ||
    target == e.currentTarget.querySelector("#auth__input-pw")
  ) {
    return;
  } else {
    let inputId = document.querySelector(".auth__input-box--id");
    let inputPw = document.querySelector(".auth__input-box--pw");
    inputPw.style.borderBottom = "1px solid #e5e7ea";
    inputId.style.borderBottom = "1px solid #e5e7ea";
  }
}
