import React from "react";
import QuestionForm from "../../../../components/Evaluador/QuestionForm/QuestionForm";
import QuestionList from "../../../../components/Evaluador/QuestionList/QuestionList";
import "./Questions.scss";
function Questions() {
  const [confirmReloading, setConfirmReloading] = React.useState(false);
  return (
    <div className="Questions">
      <div className="Questions__form">
        <QuestionForm setConfirmReloading={setConfirmReloading} />
      </div>
      <hr />
      <div className="Questions__list">
        <QuestionList
          confirmReloading={confirmReloading}
          setConfirmReloading={setConfirmReloading}
        />
      </div>
    </div>
  );
}

export default Questions;
