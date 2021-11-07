import React, { useRef, useEffect } from "react";
import { sendAnswers } from "../../../api/evaluado";
import "./Evaluation.scss";
function Evaluation(props) {
  const { evaluation, evaluationInfo } = props;

  const refExam = useRef(null);

  const submitExam = async (e) => {
    /* name = Pregunta_Pr_id, value[0] = Res_es_correcta , value[1,..]= Res_id*/
    e.preventDefault();
    const examData = new FormData(refExam.current);
    const questions = [];
    examData.forEach((value, name) => {
      // console.log(value.slice(1, value.length), value[0]);
      const question = {
        idRespuesta: value.slice(1, value.length),
        idPregunta: name,
        value: value[0],
      };
      questions.push(question);
    });
    const payload = {
      respuestas: questions,
    };
    const response = await sendAnswers(payload);
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="Evaluation">
      {evaluationInfo.length > 0 && (
        <>
          <h3>{evaluationInfo[0].Exa_nombre}</h3>
          <h5>{evaluationInfo[0].Exa_description}</h5>
        </>
      )}

      <form className="w3-container" onSubmit={submitExam} ref={refExam}>
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
    </div>
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
