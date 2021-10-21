import React, { useEffect, useState } from "react";
import { Typography, List } from "antd";
import { getGroups } from "../../../api/evaluado";
import "./GroupList.scss";
function GroupList() {
  const { Title } = Typography;
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups().then((result) => {
      console.log(result);
      setGroups(result.data);
    });
  }, []);

  return (
    <div className="GroupList">
      <Title level={2}>Mis Grupos</Title>
      <List
        pagination
        itemLayout="horizontal"
        dataSource={groups}
        renderItem={(group) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={group.Gr_nombre}
              description={group.Gr_descripcion}
            />
            <div>
              <p>Evaluador</p>
              {group.Evaluador_nombre} {group.Evaluador_apellido_paterno}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default GroupList;
