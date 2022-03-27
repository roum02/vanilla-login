const findEmail = require("../pages/route/FindEmail.hbs");
const findMyPhone = require("../pages/route/FindMyPhone.hbs");
const findIPIN = require("../pages/route/FindIPIN.hbs");
const findTemp = require("../pages/route/FindTemp.hbs");
const findNewPassword = require("../pages/route/FindNewPassword.hbs");

const FindEmail = findEmail();
const FindMyPhone = findMyPhone();
const FindIPIN = findIPIN();
const FindTemp = findTemp();
const FindNewPassword = findNewPassword();
const routes = {
  "/findEmail": FindEmail,
  "/findMyPhone": FindMyPhone,
  "/findIPIN": FindIPIN,
  "/findTemp": FindTemp,
  "/newPassword": FindNewPassword,
};

// set browser history
export const historyRouterPush = (pathName, element) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(element, routes[pathName]);
  window.onpopstate = () => {
    renderHTML(element, routes[window.location.pathname]);
  };
};

//render
export const renderHTML = (element, route) => {
  document.querySelector(element).innerHTML = route;
};
