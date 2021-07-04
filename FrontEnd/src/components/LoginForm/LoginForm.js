import React from "react";
import { Form, Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginForm.scss";
function LoginForm() {
  const { Item } = Form;
  const submit = (values) => {
    console.log(values);
  };
  return (
    <Form className="login-form" onFinish={submit}>
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

export default LoginForm;
