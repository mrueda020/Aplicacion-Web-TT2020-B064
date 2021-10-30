import React, { useState, useEffect } from "react";
import { getExams } from "../../../../api/evaluado";
import EvalautionsList from "../../../../components/User/EvaluationsList/EvaluationsList";
import "./Evaluations.scss";

function Evaluations(props) {
  const [evaluations, setEvaluations] = useState([]);
  useEffect(() => {
    const groupId = props.match.params.groupId;
    getExams(groupId).then((result) => {
      setEvaluations(result.data);
      console.log(result.data);
    });
  }, []);
  return (
    <div className="Evaluations">
      <EvalautionsList evaluations={evaluations} />
    </div>
  );
}

export default Evaluations;
