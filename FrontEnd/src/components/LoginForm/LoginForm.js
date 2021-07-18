import React, { useState } from "react";
import { Form, Button, Input, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN, baseURL } from "../../utils/constants";
import "./LoginForm.scss";
function LoginForm(props) {
  const { Item } = Form;
  const [user, setUser] = useState({ email: "", password: "" });

  const signIn = async (url, data, userType) => {
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(url);
    console.log(data);
    try {
      const response = await fetch(url, params);
      const result = await response.json();
      if (result.error) {
        notification["error"]({ message: result.error });
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        notification["success"]({ message: "Login correcto" });
        switch (userType) {
          case "user":
            window.location.reload();
            break;
          case "evaluador":
            window.location.reload();
            break;
          case "admin":
            window.location.reload();
            break;
          default:
            console.log(userType);
            break;
        }
      }
    } catch (err) {
      notification["error"]({ message: "Error en el servidor" });
    }
  };

  const submit = async () => {
    const pathName = window.location.pathname;
    const userType = pathName.split("/");
    if (userType[1] === "evaluador") {
      const url = `${baseURL}/login-evaluador`;
      await signIn(url, user, userType[1]);
    } else if (userType[1] === "admin") {
      const url = `${baseURL}/login-administrador`;
      await signIn(url, user, userType[1]);
    } else if (userType[1] === "user") {
      const url = `${baseURL}/Login`;
      await signIn(url, user, userType[1]);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Form className="login-form" onFinish={submit} onChange={onChange}>
      <Item
        type="email"
        name="email"
        rules={[
          {
            required: true,
            message: "Ingresa tu email",
          },
        ]}
      >
        <Input
          name="email"
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          placeholder="Email"
          className="login-form__input"
        />
      </Item>
      <Item
        type="password"
        name="password"
        rules={[
          {
            required: true,
            message: "Ingresa tu contraseña",
          },
        ]}
      >
        <Input.Password
          name="password"
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          placeholder="Contraseña"
          className="login-form__input"
        />
      </Item>

      <Button type="primary" className="login-form__button" htmlType="submit">
        Entrar
      </Button>
    </Form>
  );
}

export default withRouter(LoginForm);
