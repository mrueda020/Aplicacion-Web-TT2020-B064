import React from "react";
import { Card, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { deleteQuestion } from "../../../api/evaluador";
function QuestionCard(props) {
  const { Pregunta, idPregunta } = props;
  const { setConfirmReloading } = props;
  return (
    <Card
      style={{ width: "auto" }}
      actions={[
        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          title="Estas seguro de eliminar esta pregunta ?"
          okText="Si"
          cancelText="No"
          onConfirm={async () => {
            const result = await deleteQuestion(idPregunta);
            if (result.message) {
              message.success(result.message);
              setConfirmReloading(true);
            }
          }}
          onCancel={() => {
            message.error("No se agrego la pregunta");
          }}
        >
          <DeleteOutlined key="delete" style={{ color: "red" }} />
        </Popconfirm>,
        <EditOutlined key="edit" style={{ color: "green" }} />,
      ]}
    >
      <Card.Meta title={`Pregunta ${idPregunta}`} description={Pregunta} />
    </Card>
  );
}

export default QuestionCard;
