import React from "react";
import { Typography, List } from "antd";
import "./EvaluationsList.scss";
function EvaluationsList(props) {
  const { evaluations } = props;
  const { Title } = Typography;

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
              title="Titulo del examen"
              description="Descripcion del examen"
            />
            <div>
              <p>Evaluador TODO Obtener evaluador</p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default EvaluationsList;
