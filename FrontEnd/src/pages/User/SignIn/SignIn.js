import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Layout, Tabs } from "antd";
import Logo from "../../../assets/png/logolinkex2.png";
import LoginForm from "../../../components/LoginForm/LoginForm";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import { AuthContext } from "../../../provider/AuthProvider";
import "./SignIn.scss";
function SignIn() {
  const { user } = useContext(AuthContext);
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (user && user.rol === "evaluado") {
    return <Redirect to="/user" />;
  } else if (user && user.rol === "evaluador") {
    return <Redirect to="/evaluador" />;
  } else if (user && user.rol === "admin") {
    return <Redirect to="/admin" />;
  }

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
