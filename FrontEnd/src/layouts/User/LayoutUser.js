import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import SignIn from "../../pages/User/SignIn/SignIn";
import { AuthContext } from "../../provider/AuthProvider";
import "./LayoutUser.scss";
import { Layout } from "antd";
function LayoutUser(props) {
  const { routes } = props;
  const { Content } = Layout;
  const { user, isLoading } = useContext(AuthContext);

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/user/login" component={SignIn} />
        <Redirect to="/user/login" />
      </>
    );
  } else if (user && user.rol === "evaluado") {
    return (
      <Layout className="layout-user">
        <Navbar />
        <Sidebar />
        <Content className="layout-user__content w3-main">
          <LoadRoutes routes={routes}></LoadRoutes>
        </Content>
      </Layout>
    );
  } else if (user && user.rol === "evaluador") {
    return <Redirect to="/evaluador" />;
  } else if (user && user.rol === "admin") {
    return <Redirect to="/admin" />;
  }

  return <Redirect to="/user/groups" />;
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
