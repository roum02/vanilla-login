export default function handleTabClass(id) {
  if (
    document.getElementById(id).className.indexOf("auth__tab--active") == -1
  ) {
    document.getElementById(id).className =
      "auth__tab-button auth__tab--active";
  } else {
    document.getElementById(id).className = "auth__tab-button";
  }
}
