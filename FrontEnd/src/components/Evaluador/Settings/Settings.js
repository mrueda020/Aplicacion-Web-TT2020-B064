import React, { useState, useRef } from "react";
import { Form, Input, Button, Row, Col, Typography, notification } from "antd";
import { updateInfo } from "../../../api/evaluador";
import { siteKey } from "../../../utils/constants";
import ReCAPTCHA from "react-google-recaptcha";
import "./Settings.scss";
function Settings() {
  const { Title } = Typography;
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const recaptchaRef = useRef(null);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onCaptchaChange = () => {
    setIsCaptchaSolved(!isCaptchaSolved);
  };

  const updateUser = async () => {
    if (!isCaptchaSolved) {
      notification["error"]({ message: "Resuelve el captcha" });
      return;
    }
    const response = await updateInfo(user);
    const result = await response.json();
    console.log(result);
    if (response.status === 400 || response.status === 500) {
      notification["error"]({ message: result.error });
      return;
    }
    notification["success"]({ message: result.message });
  };
  return (
    <div className="SettingsForm">
      <Title level={2}>Configuracion</Title>
      <Form className="form-edit" onFinish={updateUser}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                placeholder="Nombre"
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                placeholder="Apellidos"
                onChange={(e) => {
                  setUser({ ...user, surname: e.target.value });
                }}
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                placeholder="Email"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                type="password"
                placeholder="Confirmar Contraseña"
                onChange={(e) => {
                  setUser({ ...user, confirmPassword: e.target.value });
                }}
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar Usuario
          </Button>
        </Form.Item>
      </Form>
      <div className="login-form__captcha">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={onCaptchaChange}
        />
      </div>
    </div>
  );
}

export default Settings;
