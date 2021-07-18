import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../../pages/Evaluador/SignIn/SignIn";
import { Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Evaluador/Sidebar/Sidebar";
import { AuthContext } from "../../provider/AuthProvider";
import "./LayoutEvaluador.scss";

function LayoutEvaluador(props) {
  const { Content } = Layout;
  const { routes } = props;
  const { user, isLoading } = useContext(AuthContext);
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/evaluador/login" component={SignIn} />
        <Redirect to="/evaluador/login" />
      </>
    );
  }
  if (user && user.rol === "evaluador") {
    return (
      <Layout className="layout-evaluador">
        <Navbar />
        <Sidebar />
        <Content className="layout-evaluador__content w3-main">
          <LoadRoutes routes={routes}></LoadRoutes>
        </Content>
      </Layout>
    );
  } else if (user && user.rol === "evaluado") {
    return <Redirect to="/user" />;
  } else if (user && user.rol === "admin") {
    return <Redirect to="/admin" />;
  }
  return null;
}

function LoadRoutes(props) {
  const { routes } = props;
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
}

export default LayoutEvaluador;
