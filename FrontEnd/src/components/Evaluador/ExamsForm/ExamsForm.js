import React, { useEffect, useState } from "react";
import {
  Transfer,
  Typography,
  Form,
  Switch,
  DatePicker,
  Button,
  notification,
} from "antd";
import moment from "moment";
import { fetchAllQuestions } from "../../../api/evaluador";
import "./ExamsForm.scss";
function ExamsForm() {
  const { Title } = Typography;
  const [questions, setQuestions] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [isMockExam, setIsMockExam] = useState(true);
  const [dates, setDates] = useState([]);
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

  const onChangeDatePicker = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    if (value === null) {
      setDates([]);
      return;
    }
    setDates(dateString);
  };

  const onFinish = () => {
    let payload = {};
    if (!targetKeys.length) {
      notification["error"]({ message: "No has seleccionado las preguntas" });
      return;
    }
    if (!isMockExam) {
      if (!dates.length) {
        console.log("here");
        notification["error"]({
          message: "Selecciona el periodo de aplicacion",
        });
        return;
      }
      console.log(dates);
      console.log(targetKeys);
      return;
    }
    console.log(targetKeys);
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  const disabledRangeTime = (_, type) => {
    if (type === "start") {
      return {
        disabledHours: () => range(0, 0),
        disabledMinutes: () => range(0, 0),
        disabledSeconds: () => [0, 0],
      };
    }
    return {
      disabledHours: () => range(0, 0),
      disabledMinutes: () => range(0, 0),
      disabledSeconds: () => [0, 0],
    };
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
      <Form
        onFinish={onFinish}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item label="Tipo de examen">
          <Switch
            defaultChecked
            checkedChildren="Prueba"
            unCheckedChildren="Evaluación"
            onChange={(checked) => {
              setIsMockExam(checked);
              setDates([]);
            }}
          />
        </Form.Item>
        {!isMockExam && (
          <Form.Item label="Periodo de aplicacion">
            <DatePicker.RangePicker
              showTime
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              onChange={onChangeDatePicker}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear Examen
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ExamsForm;
