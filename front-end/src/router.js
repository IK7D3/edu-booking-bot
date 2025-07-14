// src/router.js
import WelcomePage from "./pages/WelcomePage";
import RegistrationPage from "./pages/RegistrationPage";
import Dashboard from "./pages/Dashboard";
import ReserveTime from "./pages/ReserveTime";
import MyReservations from "./pages/MyReservations";
import TeacherDashboard from "./pages/Teachers/TeacherDashboard";
import EditTimes from "./pages/Teachers/EditTimes";
export const routes = {
  welcome: {component: WelcomePage},
  register: {component: RegistrationPage},
  reserveTime: {component: ReserveTime},
  dashboard: {component: Dashboard},
  teacherDash: { component: TeacherDashboard },
  myReservations: {component: MyReservations},
  editTimes: { component: EditTimes },
};
