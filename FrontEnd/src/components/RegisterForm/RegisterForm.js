import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { registerUser } from "../../api/evaluado";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
function RegisterForm() {
  const { Item } = Form;
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const register = async () => {
    console.log(user);
    const response = await registerUser(user);
    const result = await response.json();
    if (result.error) {
      notification["error"]({ message: result.error });
      return;
    }

    if (response.status === 200) {
      notification["success"]({ message: result.status });
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    }
  };
  return (
    <Form onFinish={register}>
      <Item
        name="name"
        type="text"
        rules={[
          {
            required: true,
            message: "Ingresa tu nombre",
          },
        ]}
      >
        <Input
          placeholder="Nombre"
          onChange={(e) => {
            setUser({ ...user, nombre: e.target.value });
          }}
        ></Input>
      </Item>
      <Item
        name="lastname"
        type="text"
        rules={[
          {
            required: true,
            message: "Ingresa tus apellidos",
          },
        ]}
      >
        <Input
          placeholder="Apellidos"
          onChange={(e) => {
            setUser({ ...user, apellidos: e.target.value });
          }}
        ></Input>
      </Item>
      <Item
        name="email"
        type="email"
        rules={[{ required: true, message: "Ingresa tu email" }]}
      >
        <Input
          placeholder="Email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        ></Input>
      </Item>
      <Item
        name="password"
        type="password"
        rules={[{ required: true, message: "Ingresa tu contraseña" }]}
      >
        <Input.Password
          placeholder="Contraseña"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        ></Input.Password>
      </Item>
      <Item
        name="passwordRepeat"
        type="password"
        rules={[{ required: true, message: "Confirma tu contraseña" }]}
      >
        <Input.Password
          placeholder="Confirma tu contraseña"
          onChange={(e) => {
            setUser({ ...user, confirmarPassword: e.target.value });
          }}
        ></Input.Password>
      </Item>
      <Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Registrate
        </Button>
      </Item>
    </Form>
  );
}

export default RegisterForm;
