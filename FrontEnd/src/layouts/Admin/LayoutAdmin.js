import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../../pages/Admin/SignIn/SignIn";
import Navbar from "../../components/Admin/Navbar/Navbar";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import { Layout } from "antd";
import "./LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { Content } = Layout;
  const { routes } = props;
  const user = null;
  if (user) {
    return (
      <>
        <Route path="/admin/login" component={SignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  return (
    <Layout className="layout-admin">
      <Navbar />
      <Sidebar />
      <Content className="layout-admin__content w3-main">
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

export default LayoutAdmin;
