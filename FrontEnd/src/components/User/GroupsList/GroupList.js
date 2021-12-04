import React, { useEffect, useState } from "react";
import { Typography, List } from "antd";
import { getGroups } from "../../../api/evaluado";
import { NavLink } from "react-router-dom";
import "./GroupList.scss";
function GroupList() {
  const { Title } = Typography;
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups().then((result) => {
      if (result.data) setGroups(result.data);
      else setGroups([]);
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
              title={
                <NavLink to={`/user/evaluations/${group.Gr_id}`}>
                  {group.Gr_nombre}{" "}
                </NavLink>
              }
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
