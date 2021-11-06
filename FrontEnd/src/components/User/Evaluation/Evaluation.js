import React from "react";
import "./Evaluation.scss";
function Evaluation(props) {
  const { evaluation } = props;

  return (
    <div className="Evaluation">
      <form className="w3-container ">
        {evaluation.map((eva, index) => (
          <Question key={index} eva={eva} />
        ))}
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
  console.log(answers);
  return (
    <>
      {answers.map((answer, index) => (
        <p key={index}>
          <input
            className="w3-radio"
            type="radio"
            name={answer.Pregunta_Pr_id}
            value={answer.Res_respuesta}
          />
          &nbsp;
          <label>{answer.Res_respuesta}</label>
        </p>
      ))}
    </>
  );
}

export default Evaluation;
