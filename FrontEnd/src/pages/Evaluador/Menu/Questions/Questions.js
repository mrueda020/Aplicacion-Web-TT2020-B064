import React from "react";
import QuestionForm from "../../../../components/Evaluador/QuestionForm/QuestionForm";
import "./Questions.scss";
function Questions() {
  return (
    <div className="Questions">
      <div className="Questions__form">
        <QuestionForm />
      </div>
    </div>
  );
}

export default Questions;
