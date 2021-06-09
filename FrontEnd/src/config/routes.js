//Layout
import LayoutUser from "../layouts/LayoutUser";

//User Pages
import SignIn from "../pages/SignIn/SignIn";
import Overview from "../pages/User/Overview";
import Settings from "../pages/User/Settings";
import Evaluations from "../pages/User/Evaluations";
import Configuration from "../pages/User/Configuration";

const routes = [
  {
    path: "/",
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
      { path: "/user/configuration", component: Configuration, exact: true },
    ],
  },
];

export default routes;
