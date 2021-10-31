import React from "react";
import { Typography, List } from "antd";
import { NavLink } from "react-router-dom";
import "./EvaluationsList.scss";
function EvaluationsList(props) {
  const { evaluations } = props;
  const { Title } = Typography;
  console.log(evaluations);
  return (
    <div className="EvaluationsList">
      <Title level={2}>Mis Examenes</Title>
      <List
        pagination
        itemLayout="horizontal"
        dataSource={evaluations}
        renderItem={(evaluation) => (
          <List.Item>
            <List.Item.Meta
              title={
                <NavLink to={`/user/evaluation/${evaluation.Exa_id}`}>
                  {evaluation.Exa_nombre}
                </NavLink>
              }
              description={evaluation.Exa_description}
            />
            <div>
              <p>Fecha de Aplicacion: {evaluation.Exa_fecha_aplicacion}</p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default EvaluationsList;
