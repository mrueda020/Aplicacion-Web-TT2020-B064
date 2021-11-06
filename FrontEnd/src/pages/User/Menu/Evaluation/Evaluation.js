import React, { useState, useEffect } from "react";
import { getEvaluation } from "../../../../api/evaluado";
import EvaluationForm from "../../../../components/User/Evaluation/Evaluation";
import "./Evaluation.scss";
function Evaluation(props) {
  const [evaluation, setEvaluation] = useState([]);
  useEffect(() => {
    const examId = props.match.params.examId;
    getEvaluation(examId).then((result) => {
      setEvaluation(result.data);
    });
  }, []);

  return (
    <div className="Evaluation">
      <EvaluationForm evaluation={evaluation} />
    </div>
  );
}

export default Evaluation;
