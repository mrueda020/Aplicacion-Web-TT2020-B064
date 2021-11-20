import React, { useRef, useEffect } from "react";
import { sendAnswers } from "../../../api/evaluado";
import moment from "moment";
import "./Evaluation.scss";
function Evaluation(props) {
  const { evaluation, evaluationInfo, groupId } = props;
  const refExam = useRef(null);
  if (evaluationInfo.length)
    console.log(moment(evaluationInfo[0].Exa_fecha_aplicacion_fin).valueOf());
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
    console.log(result);
  };

  return (
    <>
      <div className="Evaluation">
        {evaluationInfo.length > 0 && (
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
                  onSubmit={submitExam}
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
                <h3>Examen no Disponible</h3>
              </>
            )}
          </>
        )}
      </div>
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
