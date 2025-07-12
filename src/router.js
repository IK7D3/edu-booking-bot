// src/router.js
import WelcomePage from "./pages/WelcomePage";
import RegistrationPage from "./pages/RegistrationPage";
import Dashboard from "./pages/Dashboard";
import ReserveTime from "./pages/ReserveTime";
import  MyReservations  from "./pages/MyReservations";

export const routes = {
  welcome: {
    component: WelcomePage,
  },
  register: {
    component: RegistrationPage,
    // component: Dashboard,
    // component: Dashboard,
  },
  reserveTime:
  {
      component: ReserveTime,
  },
  dashboard: {
    component: Dashboard,
  },
  myReservations: {
    component: MyReservations,
  },
};
