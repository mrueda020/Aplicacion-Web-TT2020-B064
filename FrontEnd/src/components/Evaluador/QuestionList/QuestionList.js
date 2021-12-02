import React, { useState, useEffect } from "react";
import { Typography, Empty } from "antd";
import QuestionCard from "../QuestionCard/QuestionCard";
import { getQuestions } from "../../../api/evaluador";
import "./QuestionList.scss";
function QuestionList(props) {
  const { confirmReloading, setConfirmReloading } = props;
  const { Title } = Typography;
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    let emptyDescription = document.getElementsByClassName(
      "ant-empty-description"
    );
    for (let i = 0; i < emptyDescription.length; i++) {
      emptyDescription[i].innerHTML = "Vacio";
    }
  });
  useEffect(() => {
    getQuestions().then((result) => {
      if (result.data) {
        setQuestions(result.data);
      } else {
        setQuestions([]);
      }
    });
    setConfirmReloading(false);
  }, [confirmReloading]);
  return (
    <div className="QuestionList">
      <Title level={2}>Mis Preguntas</Title>
      {questions.length > 0 ? (
        <div className="QuestionList__container">
          {questions.map((question, index) => (
            <QuestionCard
              {...question}
              key={index}
              setConfirmReloading={setConfirmReloading}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default QuestionList;
