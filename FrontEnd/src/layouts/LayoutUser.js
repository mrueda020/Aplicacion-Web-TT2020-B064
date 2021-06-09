import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../components/User/Navbar/Navbar";
import Sidebar from "../components/User/Sidebar/Sidebar";
import SignIn from "../pages/SignIn/SignIn";
import "./LayoutUser.scss";
import { Layout } from "antd";
function LayoutUser(props) {
  const { routes } = props;
  const { Content } = Layout;
  const user = null;
  if (user) {
    return (
      <>
        <Route path="/user/login" component={SignIn} />
        <Redirect to="/user/login" />
      </>
    );
  }
  return (
    <Layout className="layout-user">
      <Navbar />
      <Sidebar />
      <Content className="layout-user__content w3-main">
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

export default LayoutUser;
