//컴퓨터에 쿠키 저장 함수
export function setSave(name, value, expiredays) {
  let today = new Date();
  //console.log(today);
  today.setDate(today.getDate() + expiredays);
  document.cookie =
    name +
    "=" +
    escape(value) +
    "; path=/; expires=" +
    today.toGMTString() +
    ";";
  console.log(document.cookie);
}

//저장할 아이디 값을 받아 setSave함수에게 토스
export function saveLogin(id) {
  if (id != "") {
    // userId 쿠키에 id값을 7일간 저장
    setSave("userId", id, 7);
  } else {
    // uerId 쿠키 삭제
    setSave("userId", id, -1);
    console.log("쿠키 삭제됨");
  }
}

// 페이지가 로드될 때 저장한 쿠키 호출
export function getLogin() {
  let cook = document.cookie + ";";
  let key = "userId";
  let idx = cook.indexOf(key, 0);
  let val = "";
  //console.log(idx);

  if (idx != -1) {
    cook = cook.substring(idx, cook.length);
    let begin = cook.indexOf("=", 0) + 1;
    let end = cook.indexOf(";", begin);
    val = unescape(cook.substring(begin, end));
    //console.log(val);
  }
  // 가져온 쿠키값이 있을 경우
  if (val != "") {
    document.getElementById("auth__input-id").value = val;
    document.getElementById("auth__checkbox--saveId").checked = true;
  }
}
