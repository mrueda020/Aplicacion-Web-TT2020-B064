import React, { useState, useEffect } from "react";
import { getEvaluation } from "../../../../api/evaluado";
function Evaluation(props) {
  const [evaluation, setEvaluation] = useState([]);
  useEffect(() => {
    const examId = props.match.params.examId;
    getEvaluation(examId).then((result) => {
      console.log(result);
      setEvaluation(result);
    });
  }, []);

  return (
    <>
      <div>Estamos en el Examen</div>
    </>
  );
}

export default Evaluation;
