//Layout
import LayoutUser from "../layouts/User/LayoutUser";
import LayoutEvaluador from "../layouts/Evaluador/LayoutEvaluador";
import LayoutAdmin from "../layouts/Admin/LayoutAdmin";
//User Pages
import SignIn from "../pages/User/SignIn/SignIn";
import Groups from "../pages/User/Menu/Groups/Groups";
import Settings from "../pages/User/Menu/Settings/Settings";
import Evaluations from "../pages/User/Menu/Evaluations/Evaluations";
import Evaluation from "../pages/User/Menu/Evaluation/Evaluation";
import Results from "../pages/User/Menu/Results/Results";
//Evaluador pages
import SignInEvaluador from "../pages/Evaluador/SignIn/SignIn";
import Questions from "../pages/Evaluador/Menu/Questions/Questions";
import Exams from "../pages/Evaluador/Menu/Exams/Exams";
import SettingsEvaluador from "../pages/Evaluador/Menu/Settings/Settings";
//Admin pages
import SignInAdmin from "../pages/Admin/SignIn/SignIn";
import Evaluadores from "../pages/Admin/Evaluadores/Evaluadores";
import Evaluados from "../pages/Admin/Evaluados/Evaluados";
const routes = [
  {
    path: "/user",
    component: LayoutUser,
    exact: false,
    routes: [
      { path: "/user/login", component: SignIn, exact: true },
      {
        path: "/user/groups",
        component: Groups,
        exact: true,
      },
      {
        path: "/user/settings",
        component: Settings,
        exact: true,
      },
      {
        path: "/user/evaluations/:groupId",
        component: Evaluations,
        exact: true,
      },
      {
        path: "/user/evaluation/:examId/:groupId",
        component: Evaluation,
        exact: true,
      },
      {
        path: "/user/results",
        component: Results,
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
      {
        path: "/evaluador/question",
        exact: true,
        component: Questions,
      },
      {
        path: "/evaluador/exams",
        exact: true,
        component: Exams,
      },
      {
        path: "/evaluador/settings",
        exact: true,
        component: SettingsEvaluador,
      },
    ],
  },
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      { path: "/admin/login", exact: true, component: SignInAdmin },
      {
        path: "/admin/evaluados",
        extact: true,
        component: Evaluados,
      },
      {
        path: "/admin/evaluadores",
        exact: true,
        component: Evaluadores,
      },
    ],
  },
];

export default routes;
