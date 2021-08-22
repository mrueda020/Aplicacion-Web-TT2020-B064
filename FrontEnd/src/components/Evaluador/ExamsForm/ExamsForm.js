import React, { useEffect, useState } from "react";
import { Transfer, Typography } from "antd";
import { fetchAllQuestions } from "../../../api/evaluador";
import "./ExamsForm.scss";
function ExamsForm() {
  const { Title } = Typography;
  const [questions, setQuestions] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  const cleanData = () => {
    const data = questions.map((q) => {
      const question = {
        key: q.idPregunta,
        Pregunta: q.Pregunta,
      };
      return question;
    });
    setMockData(data);
  };
  useEffect(() => {
    fetchAllQuestions().then((result) => {
      if (result.data) {
        setQuestions(result.data);
      } else {
        setQuestions([]);
      }
    });
  }, []);

  useEffect(() => {
    cleanData();
  }, [questions]);

  const onChange = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  return (
    <div className="ExamsForm">
      <Title level={2}>Crear Examen</Title>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={onChange}
        render={(item) => item.Pregunta}
        pagination
        showSearch
        oneWay
      />
      <br />
    </div>
  );
}

export default ExamsForm;
