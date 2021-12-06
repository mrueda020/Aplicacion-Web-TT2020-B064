import React, { useState, useEffect } from "react";
import { Typography, Empty, Card, Popconfirm, message } from "antd";
import { getGroups, deleteGroup } from "../../../api/evaluador";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import "./GroupsList.scss";
function GroupsList(props) {
  const { confirmReloading, setConfirmReloading } = props;
  const { Title } = Typography;
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups().then((result) => {
      if (result.data) {
        setGroups(result.data);
      } else {
        setGroups([]);
      }
      setConfirmReloading(false);
    });
  }, [confirmReloading]);

  return (
    <div className="GroupsList">
      {groups.length > 0 && (
        <>
          <Title level={2}>Mis Grupos</Title>
          <div className="GroupsList__container">
            {groups.map((group, index) => (
              <GroupCard
                key={index}
                {...group}
                setConfirmReloading={setConfirmReloading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function GroupCard(props) {
  const { Gr_nombre, Gr_descripcion, Gr_id, setConfirmReloading } = props;
  return (
    <Card
      style={{ width: "auto" }}
      actions={[
        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          title="¿Estas seguro de eliminar este grupo ?"
          okText="Si"
          cancelText="No"
          onConfirm={async () => {
            const result = await deleteGroup(Gr_id);
            if (result.message) {
              message.success(result.message);
              setConfirmReloading(true);
            }
          }}
          onCancel={() => {
            message.error("No se elimino el grupo");
          }}
        >
          <DeleteOutlined key="delete" style={{ color: "red" }} />
        </Popconfirm>,
      ]}
    >
      <Card.Meta title={Gr_nombre} description={Gr_descripcion} />
    </Card>
  );
}

export default GroupsList;
