import React, { useState, useEffect } from "react";
import { Transfer, Typography, Input, Form, Button, notification } from "antd";
import { getUsers, createGroup } from "../../../api/evaluador";
import "./GroupForm.scss";

function GroupForm() {
  const { Title } = Typography;
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [groupName, setNameGroup] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getUsers().then((result) => {
      if (result.data.length) setUsers(result.data);
      else setUsers([]);
    });
  }, []);

  useEffect(() => {
    cleanData();
  }, [users]);

  const cleanData = () => {
    const cleanedData = users.map((user) => {
      const u = {
        key: user.Eva_id,
        name: `${user.Eva_nombre} ${user.Eva_apellido_paterno} ${user.Eva_apellido_materno}`,
      };
      return u;
    });

    setData(cleanedData);
  };

  const onChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const onFinish = async () => {
    if (groupName === "" || description === "" || !targetKeys.length) {
      notification["error"]({
        message: "Completa todos los campos",
      });
      return;
    }

    let payload = {
      name: groupName,
      description: description,
      usersIds: targetKeys,
    };

    const result = await createGroup(payload);

    if (result.status === 500) {
      notification["error"]({
        message: "Error en el servidor",
      });
      return;
    }

    if (result.status === 200) {
      notification["success"]({
        message: "Grupo creado",
      });
      return;
    }
  };

  return (
    <div className="GroupForm">
      <Title level={2}>Crear Grupo</Title>
      <Transfer
        dataSource={data}
        targetKeys={targetKeys}
        pagination
        showSearch
        oneWay
        render={(item) => item.name}
        onChange={onChange}
      />
      <br />
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input
            name="nombre"
            placeholder="Nombre del grupo"
            allowClear
            bordered
            onChange={(e) => {
              setNameGroup(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            name="description"
            placeholder="Descripcion del grupo"
            allowClear
            bordered
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear Grupo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GroupForm;
