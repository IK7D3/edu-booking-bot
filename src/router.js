// src/router.js
import WelcomePage from "./pages/WelcomePage";
// import RegistrationPage from "./pages/RegistrationPage";
import Dashboard from "./pages/Dashboard";

export const routes = {
  welcome: {
    component: WelcomePage,
  },
  register: {
    // component: RegistrationPage,
    component: Dashboard,
  },
  dashboard: {
    component: Dashboard,
  },
};
