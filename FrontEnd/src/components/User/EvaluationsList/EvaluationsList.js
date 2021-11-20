import React from "react";
import { Typography, List, Popconfirm } from "antd";

import { withRouter } from "react-router-dom";
import "./EvaluationsList.scss";
function EvaluationsList(props) {
  const { evaluations, groupId } = props;
  const { Title } = Typography;
  const redirectToExam = (evaluation) => {
    props.history.push(`/user/evaluation/${evaluation.Exa_id}/${groupId}`);
  };
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
                <Popconfirm
                  title={
                    evaluation.Exa_tipo_de_examen == 0
                      ? "Estas seguro que quieres iniciar la prueba, una vez iniciada debes terminarla"
                      : "Quieres hacer el examen de prueba"
                  }
                  okText="Si"
                  cancelText="No"
                  onConfirm={() => {
                    redirectToExam(evaluation);
                  }}
                >
                  <a href="#">{evaluation.Exa_nombre}</a>
                </Popconfirm>
              }
              description={evaluation.Exa_description}
            />
            <div>
              {evaluation.Exa_tipo_de_examen == 0 ? (
                <>
                  <p>
                    Fecha de inicio: {evaluation.Exa_fecha_aplicacion_inicio}
                  </p>
                  <p>
                    Fecha de finalizacion: {evaluation.Exa_fecha_aplicacion_fin}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Fecha de inicio: {evaluation.Exa_fecha_aplicacion_inicio}
                  </p>
                </>
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default withRouter(EvaluationsList);
