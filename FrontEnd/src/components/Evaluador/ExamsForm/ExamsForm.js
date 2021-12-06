import React, { useEffect, useState } from "react";
import {
  Transfer,
  Input,
  Typography,
  Form,
  Switch,
  DatePicker,
  Button,
  notification,
} from "antd";
import moment from "moment";
import { createExam, fetchAllQuestions } from "../../../api/evaluador";
import "./ExamsForm.scss";

function ExamsForm({ setConfirmReloading }) {
  const { Title } = Typography;
  const [questions, setQuestions] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [isMockExam, setIsMockExam] = useState(true);
  const [dates, setDates] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const cleanData = () => {
    const data = questions.map((q) => {
      const question = {
        key: q.Pr_id,
        Pregunta: q.Pr_pregunta,
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

  useEffect(() => {
    let inputs = document.getElementsByClassName("ant-transfer-list-search");
    for (let i = 0; i < inputs.length; i++) inputs[i].placeholder = "Buscar";
  }, []);

  useEffect(() => {
    let emptyDescription = document.getElementsByClassName(
      "ant-empty-description"
    );
    // if (emptyDescription.length) emptyDescription[0].innerHTML = "Vacio";
    for (let i = 0; i < emptyDescription.length; i++) {
      emptyDescription[i].innerHTML = "Vacio";
    }
  });

  const onChange = (newTargetKeys, direction, moveKeys) => {
    // console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  const onChangeDatePicker = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    if (value === null) {
      setDates([]);
      return;
    }
    setDates(dateString);
  };

  const onFinish = async () => {
    let payload = {};

    if (!targetKeys.length) {
      notification["error"]({ message: "No has seleccionado las preguntas" });
      return;
    }

    if (description === "") {
      notification["error"]({ message: "Agrega la descripcion al examen" });
      return;
    }

    if (name === "") {
      notification["error"]({ message: "Agrega un nombre al examen" });
      return;
    }

    payload.questionsIds = targetKeys;
    payload.description = description;
    payload.name = name;
    payload.typeExam = isMockExam;
    if (!isMockExam) {
      if (!dates.length) {
        notification["error"]({
          message: "Selecciona el periodo de aplicacion",
        });
        return;
      }

      if (moment(dates[0]).valueOf() < moment.now()) {
        notification["error"]({
          message: "La fecha de aplicacion no es valida",
        });
        return;
      }
      payload.dates = dates;
    } else {
      payload.dates = [
        moment().format("YYYY-MM-DD h:mm:ss"),
        moment().format("YYYY-MM-DD h:mm:ss"),
      ];
    }
    const result = await createExam(payload);
    if (result.status === 200) {
      notification["success"]({ message: "Examen creado" });
      setConfirmReloading(true);
    } else notification["error"]({ message: "Error en el servidor" });
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
    return current && current < moment().subtract(1, "days");
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
        selectAllLabels={[
          ({ selectedCount, totalCount }) => (
            <span>
              {selectedCount} de {totalCount} preguntas
            </span>
          ),
          ({ selectedCount, totalCount }) => (
            <span>{totalCount} preguntas</span>
          ),
        ]}
        listStyle={{
          width: 350,
          height: 550,
        }}
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
        <Form.Item label="Nombre del examen">
          <Input
            name="nombre"
            placeholder="Nombre del examen"
            allowClear
            bordered
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
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
              placeholder={["Fecha de inicio", "Fecha de termino"]}
              showTime
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              onChange={onChangeDatePicker}
            />
          </Form.Item>
        )}
        <Form.Item label="Descripcion del examen">
          <Input.TextArea
            name="description"
            placeholder="Descripcion del examen"
            allowClear
            bordered
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Item>
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
