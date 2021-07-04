import React from "react";
import { Button, Form, Input } from "antd";
import {} from "@ant-design/icons";
function RegisterForm() {
  const { Item } = Form;
  return (
    <Form>
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
        <Input placeholder="Nombre"></Input>
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
        <Input placeholder="Apellidos"></Input>
      </Item>
      <Item
        name="email"
        type="email"
        rules={[{ required: true, message: "Ingresa tu email" }]}
      >
        <Input placeholder="Email"></Input>
      </Item>
      <Item
        name="password"
        type="password"
        rules={[{ required: true, message: "Ingresa tu contraseña" }]}
      >
        <Input.Password placeholder="Contraseña"></Input.Password>
      </Item>
      <Item
        name="passwordRepeat"
        type="password"
        rules={[{ required: true, message: "Confirma tu contraseña" }]}
      >
        <Input.Password placeholder="Confirma tu contraseña"></Input.Password>
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
