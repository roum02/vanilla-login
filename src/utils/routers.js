const findEmail = require("../pages/route/FindEmail.hbs");
const findMyPhone = require("../pages/route/FindMyPhone.hbs");
const findIPIN = require("../pages/route/FindIPIN.hbs");
const findTemp = require("../pages/route/FindTemp.hbs");
const findNewPassword = require("../pages/route/FindNewPassword.hbs");
const mainPage = require("../pages/route/MainPage.hbs");

const FindEmail = findEmail();
const FindMyPhone = findMyPhone();
const FindIPIN = findIPIN();
const FindTemp = findTemp();
const FindNewPassword = findNewPassword();
const MainPage = mainPage();
const routes = {
  "/findEmail": FindEmail,
  "/findMyPhone": FindMyPhone,
  "/findIPIN": FindIPIN,
  "/findTemp": FindTemp,
  "/newPassword": FindNewPassword,
  "/mainPage": MainPage,
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
