import React, { useState, useEffect } from "react";
import { getEvaluation } from "../../../../api/evaluado";
import EvaluationForm from "../../../../components/User/Evaluation/Evaluation";
import "./Evaluation.scss";
function Evaluation(props) {
  const [evaluation, setEvaluation] = useState([]);
  const [evaluationInfo, setEvaluationInfo] = useState([]);
  const [groupId, setGroupId] = useState(null);
  useEffect(() => {
    const examId = props.match.params.examId;
    const groupId = props.match.params.groupId;
    setGroupId(groupId);
    getEvaluation(examId).then((result) => {
      setEvaluation(result.data);
      setEvaluationInfo(result.examenInfo);
    });
  }, []);

  return (
    <div className="Evaluation">
      <EvaluationForm
        evaluation={evaluation}
        evaluationInfo={evaluationInfo}
        groupId={groupId}
      />
    </div>
  );
}

export default Evaluation;
