import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../../pages/Evaluador/SignIn/SignIn";
import { Layout } from "antd";
import Navbar from "../../components/Evaluador/Navbar/Navbar";
import Sidebar from "../../components/Evaluador/Sidebar/Sidebar";

import "./LayoutEvaluador.scss";
function LayoutEvaluador(props) {
  const { Content } = Layout;
  const { routes } = props;
  const user = null;
  if (user) {
    return (
      <>
        <Route path="/evaluador/login" component={SignIn} />
        <Redirect to="/evaluador/login" />
      </>
    );
  }

  return (
    <Layout className="layout-evaluador">
      <Navbar />
      <Sidebar />
      <Content className="layout-evaluador__content w3-main">
        <LoadRoutes routes={routes}></LoadRoutes>
      </Content>
    </Layout>
  );
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
