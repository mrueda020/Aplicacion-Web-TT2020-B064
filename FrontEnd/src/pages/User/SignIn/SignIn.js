import React from "react";
import { Layout, Tabs } from "antd";
import Logo from "../../../assets/png/logolinkex2.png";
import LoginForm from "../../../components/LoginForm/LoginForm";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import "./SignIn.scss";
function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="" />
        </h1>

        <div className="sign-in__content-tabs">
          <Tabs type={"card"}>
            <TabPane key={"1"} tab={<span>Entra</span>}>
              <LoginForm></LoginForm>
            </TabPane>

            <TabPane key={"2"} tab={<span>Registrate</span>}>
              <RegisterForm></RegisterForm>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
export default SignIn;
