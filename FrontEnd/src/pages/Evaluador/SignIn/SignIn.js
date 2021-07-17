import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Layout, Card } from "antd";
import Logo from "../../../assets/png/logolinkex2.png";
import LoginForm from "../../../components/LoginForm/LoginForm";
import { AuthContext } from "../../../provider/AuthProvider";
import "./SignIn.scss";
function SignIn() {
  const { user } = useContext(AuthContext);
  const { Content } = Layout;

  if (user && user.rol === "evaluado") {
    return <Redirect to="/user" />;
  } else if (user && user.rol === "evaluador") {
    return <Redirect to="/evaluador" />;
  } else if (user && user.rol === "admin") {
    return <Redirect to="/admin" />;
  }

  return (
    <Layout className="sign-in-evaluador">
      <Content className="sign-in-evaluador__content">
        <h1 className="sign-in-evaluador__content-logo">
          <img src={Logo} alt="" />
        </h1>

        <Card title="Entra" className="sign-in-evaluador__content-form">
          <LoginForm></LoginForm>
        </Card>
      </Content>
    </Layout>
  );
}
export default SignIn;
