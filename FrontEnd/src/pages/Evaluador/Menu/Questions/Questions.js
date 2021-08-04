import React from "react";
import QuestionForm from "../../../../components/Evaluador/QuestionForm/QuestionForm";
import QuestionList from "../../../../components/Evaluador/QuestionList/QuestionList";
import "./Questions.scss";
function Questions() {
  return (
    <div className="Questions">
      <div className="Questions__form">
        <QuestionForm />
      </div>
      <hr />
      <div className="Questions__list">
        <QuestionList />
      </div>
    </div>
  );
}

export default Questions;
