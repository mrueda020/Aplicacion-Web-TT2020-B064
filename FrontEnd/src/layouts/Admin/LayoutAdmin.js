import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../../pages/Admin/SignIn/SignIn";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import { Layout } from "antd";
import { AuthContext } from "../../provider/AuthProvider";
import "./LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { user, isLoading } = useContext(AuthContext);
  const { Content } = Layout;
  const { routes } = props;

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={SignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }
  if (user && user.rol === "admin") {
    return (
      <Layout className="layout-admin">
        <Navbar />
        <Sidebar />
        <Content className="layout-admin__content w3-main">
          <LoadRoutes routes={routes}></LoadRoutes>
        </Content>
      </Layout>
    );
  } else if (user && user.rol === "evaluado") {
    return <Redirect to="/user" />;
  } else if (user && user.rol === "evaluador") {
    return <Redirect to="/evaluador" />;
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

export default LayoutAdmin;
