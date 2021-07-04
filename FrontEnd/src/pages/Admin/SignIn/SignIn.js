import React from "react";
import { Layout, Card } from "antd";
import Logo from "../../../assets/png/logolinkex2.png";
import LoginForm from "../../../components/LoginForm/LoginForm";
import "./SignIn.scss";
function SignIn() {
  const { Content } = Layout;

  return (
    <Layout className="sign-in-admin">
      <Content className="sign-in-admin__content">
        <h1 className="sign-in-admin__content-logo">
          <img src={Logo} alt="" />
        </h1>

        <Card title="Entra" className="sign-in-admin__content-form">
          <LoginForm></LoginForm>
        </Card>
      </Content>
    </Layout>
  );
}

export default SignIn;
