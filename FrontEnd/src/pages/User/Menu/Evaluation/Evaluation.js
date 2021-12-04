import React, { useState, useEffect } from "react";
import { getEvaluation } from "../../../../api/evaluado";
import EvaluationForm from "../../../../components/User/Evaluation/Evaluation";
import "./Evaluation.scss";
function Evaluation(props) {
  const [evaluation, setEvaluation] = useState([]);
  const [evaluationInfo, setEvaluationInfo] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [isResolved, setIsResolved] = useState(false);
  useEffect(() => {
    const examId = props.match.params.examId;
    const groupId = props.match.params.groupId;
    setGroupId(groupId);
    getEvaluation(examId, groupId).then((result) => {
      if (result.data) setEvaluation(result.data);
      if (result.examenInfo) setEvaluationInfo(result.examenInfo);
      if (result.data) setIsResolved(true);
    });
  }, []);

  return (
    <div className="Evaluation">
      <EvaluationForm
        evaluation={evaluation}
        evaluationInfo={evaluationInfo}
        groupId={groupId}
        isResolved={isResolved}
      />
    </div>
  );
}

export default Evaluation;
