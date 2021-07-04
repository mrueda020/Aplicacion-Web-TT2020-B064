//Layout
import LayoutUser from "../layouts/LayoutUser";
import LayoutEvaluador from "../layouts/Evaluador/LayoutEvaluador";
//User Pages
import SignIn from "../pages/User/SignIn/SignIn";
import Overview from "../pages/User/Overview";
import Settings from "../pages/User/Settings";
import Evaluations from "../pages/User/Evaluations";
import Configuration from "../pages/User/Configuration";
//Evaluador pages
import SignInEvaluador from "../pages/Evaluador/SignIn/SignIn";
const routes = [
  {
    path: "/user",
    component: LayoutUser,
    exact: false,
    routes: [
      { path: "/user/login", component: SignIn, exact: true },
      {
        path: "/user/overview",
        component: Overview,
        exact: true,
      },
      {
        path: "/user/settings",
        component: Settings,
        exact: true,
      },
      {
        path: "/user/evaluations",
        component: Evaluations,
        exact: true,
      },
    ],
  },
  {
    path: "/evaluador",
    component: LayoutEvaluador,
    exact: false,
    routes: [
      { path: "/evaluador/login", exact: true, component: SignInEvaluador },
    ],
  },
];

export default routes;
