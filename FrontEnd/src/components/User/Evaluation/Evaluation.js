import React, { useRef, useState } from "react";
import { sendAnswers } from "../../../api/evaluado";
import { Modal, notification, Result, Button } from "antd";
import moment from "moment";

import "./Evaluation.scss";
function Evaluation(props) {
  const { evaluation, evaluationInfo, groupId, isResolved } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const refExam = useRef(null);

  const submitExam = async (e) => {
    /* name = Pregunta_Pr_id, value[0] = Res_es_correcta , value[1,..]= Res_id*/
    e.preventDefault();

    const examData = new FormData(refExam.current);
    const questions = [];
    examData.forEach((value, name) => {
      const question = {
        idRespuesta: value.slice(1, value.length),
        idPregunta: name,
        value: value[0],
      };
      questions.push(question);
    });
    const payload = {
      fechaRealizacion: moment().format("YYYY-MM-DD h:mm:ss"),
      fechaInicio: evaluationInfo[0].Exa_fecha_aplicacion_inicio,
      fechaFin: evaluationInfo[0].Exa_fecha_aplicacion_fin,
      tipoExamen: evaluationInfo[0].Exa_tipo_de_examen,
      idEvaluador: evaluationInfo[0].Evaluador_Evaluador_id,
      idExamen: evaluationInfo[0].Exa_id,
      idGrupo: groupId,
      respuestas: questions,
    };
    const response = await sendAnswers(payload);
    const result = await response.json();
    if (response.status === 200)
      notification["success"]({ message: "Se han enviado tus respuestas" });
    else if (response.status === 404)
      notification["error"]({ message: "El Examen ya fue contestado" });
    else
      notification["error"]({
        message: "Error en el servidor intenta mas tarde por favor",
      });
    setIsModalVisible(false);
    setTimeout(() => {
      window.location.replace(`/user/evaluations/${groupId}`);
    }, 1500);
  };

  return (
    <>
      <div className="Evaluation">
        {evaluationInfo.length > 0 && evaluation.length ? (
          <>
            {(moment(evaluationInfo[0].Exa_fecha_aplicacion_fin).valueOf() >
              moment.now() &&
              moment(evaluationInfo[0].Exa_fecha_aplicacion_inicio).valueOf() <
                moment.now()) ||
            evaluationInfo[0].Exa_tipo_de_examen === "1" ? (
              <>
                <h3>{evaluationInfo[0].Exa_nombre}</h3>
                <h5>{evaluationInfo[0].Exa_description}</h5>
                <form
                  className="w3-container"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsModalVisible(true);
                  }}
                  ref={refExam}
                >
                  <hr></hr>
                  {evaluation.map((eva, index) => (
                    <Question key={index} eva={eva} />
                  ))}
                  <hr></hr>
                  <br></br>
                  <p>
                    <button type="submit" className="w3-btn w3-green">
                      Enviar Examen
                    </button>
                  </p>
                </form>
              </>
            ) : (
              <>
                <Result
                  status="403"
                  title="El examen no esta disponible"
                  // subTitle="Sorry, you are not authorized to access this page."
                  // extra={<Button type="primary">Regresar</Button>}
                />
              </>
            )}
          </>
        ) : (
          <>
            {isResolved && (
              <Result
                status="403"
                title="Ya no pudes volver a resolver el examen"
                // subTitle="Sorry, you are not authorized to access this page."
                // extra={<Button type="primary">Regresar</Button>}
              />
            )}
          </>
        )}
      </div>
      <Modal
        title="Confirmacion"
        visible={isModalVisible}
        okText="Si"
        cancelText="No"
        onOk={(e) => submitExam(e)}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        <p>Estas seguro de enviar tus respuestas</p>
      </Modal>
    </>
  );
}

function Question(props) {
  const { eva } = props;

  return (
    <div>
      <h5>{eva.pregunta[0].Pr_pregunta}</h5>
      <Answers answers={eva.respuestas} />
    </div>
  );
}

function Answers(props) {
  const { answers } = props;

  return (
    <>
      {answers.map((answer, index) => (
        <p key={index}>
          <input
            id={answer.Res_id}
            className="w3-radio"
            type="radio"
            name={answer.Pregunta_Pr_id}
            value={`${answer.Res_es_correcta}${answer.Res_id}`}
            required
          />
          &nbsp;
          <label>{answer.Res_respuesta}</label>
        </p>
      ))}
    </>
  );
}

export default Evaluation;
