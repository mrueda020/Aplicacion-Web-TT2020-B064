import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function QuestionCard(props) {
  const { Pregunta, idPregunta } = props;
  return (
    <Card
      style={{ width: "auto" }}
      actions={[
        <DeleteOutlined key="delete" style={{ color: "red" }} />,
        <EditOutlined key="edit" style={{ color: "green" }} />,
      ]}
    >
      <Card.Meta title={`Pregunta ${idPregunta}`} description={Pregunta} />
    </Card>
  );
}

export default QuestionCard;
