import React, { useState, useEffect } from "react";
import { getExams } from "../../../../api/evaluado";
import EvalautionsList from "../../../../components/User/EvaluationsList/EvaluationsList";
import "./Evaluations.scss";

function Evaluations(props) {
  const [evaluations, setEvaluations] = useState([]);
  const [groupId, setGroupId] = useState(null);
  useEffect(() => {
    const groupId = props.match.params.groupId;
    setGroupId(groupId);
    getExams(groupId).then((result) => {
      setEvaluations(result.data);
    });
  }, []);
  return (
    <div className="Evaluations">
      <EvalautionsList evaluations={evaluations} groupId={groupId} />
    </div>
  );
}

export default Evaluations;
