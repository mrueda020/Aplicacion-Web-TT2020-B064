import React, { useState, useEffect } from "react";
import { Typography, Empty, Card, Popconfirm, message } from "antd";
import { fetchExams, deleteExam } from "../../../api/evaluador";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import "./ExamsList.scss";
function ExamsList(props) {
  const { confirmReloadingExams, setConfirmReloading } = props;
  const { Title } = Typography;
  const [exams, setExams] = useState([]);
  useEffect(() => {
    fetchExams().then((result) => {
      if (result.data) {
        setExams(result.data);
      } else {
        setExams([]);
      }
      setConfirmReloading(false);
    });
  }, [confirmReloadingExams]);
  return (
    <div className="ExamsList">
      {exams.length > 0 && (
        <>
          <Title level={2}>Mis Examenes</Title>
          <div className="ExamsList__container">
            {exams.map((exam, index) => (
              <ExamCard
                key={index}
                {...exam}
                setConfirmReloading={setConfirmReloading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ExamCard(props) {
  console.log(props);
  const { Exa_nombre, Exa_description, Exa_id, setConfirmReloading } = props;
  return (
    <Card
      style={{ width: "auto" }}
      actions={[
        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          title="¿Estas seguro de eliminar este examen ?"
          okText="Si"
          cancelText="No"
          onConfirm={async () => {
            const result = await deleteExam(Exa_id);
            if (result.message) {
              message.success(result.message);
              setConfirmReloading(true);
            }
          }}
          onCancel={() => {
            message.error("No se elimino el examen");
          }}
        >
          <DeleteOutlined key="delete" style={{ color: "red" }} />
        </Popconfirm>,
      ]}
    >
      <Card.Meta title={Exa_nombre} description={Exa_description} />
    </Card>
  );
}

export default ExamsList;
