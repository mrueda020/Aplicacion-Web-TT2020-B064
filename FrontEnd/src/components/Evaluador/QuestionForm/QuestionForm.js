import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, Select, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getUserId } from "../../../api/auth";
import { addQuestion } from "../../../api/evaluador";
import "./QuestionForm.scss";
function QuestionForm() {
  const [formData, setForm] = useState({
    pregunta: "",
    idEvaluador: "",
    respuestaCorrecta: "",
  });
  const [answers, setAnswers] = useState({});

  const removeAnswer = (key) => {
    let tempAns = {};
    Object.keys(answers).forEach((index) => {
      if (index !== key) {
        tempAns[index] = answers[index];
      }
    });
    setAnswers(tempAns);
  };

  const makePayload = () => {
    let Answers = {};
    let i = 0;
    let correctAnswer;
    Object.keys(answers).forEach((index) => {
      Answers[`respuesta${i}`] = answers[index];
      if (index === formData.respuestaCorrecta) {
        correctAnswer = `respuesta${i}`;
      }
      i++;
    });
    let idEvaluador = getUserId();
    let payload = {};
    payload.pregunta = formData.pregunta;
    payload.respuestaCorrecta = correctAnswer;
    payload.idEvaluador = idEvaluador;
    payload = { ...payload, ...Answers };
    return payload;
  };

  const onFinish = async () => {
    if (formData.pregunta === "") {
      notification["error"]({ message: "Ingrese la pregunta" });
      return;
    }

    if (Object.keys(answers).length < 2) {
      notification["error"]({ message: "Ingrese al menos 2 respuestas" });
      return;
    }

    let answer = Object.keys(answers).find(
      (ans) => ans === formData.respuestaCorrecta
    );
    if (!answer) {
      notification["error"]({ message: "Seleccione la respuesta correcta" });
      return;
    }
    const payload = makePayload();
    const response = await addQuestion(payload);
    console.log(response);
    console.log(await response.json());
  };
  return (
    <div className="QuestionForm">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Pregunta">
          <Input.TextArea
            name="pregunta"
            placeholder="Ingresa la pregunta"
            allowClear
            bordered
            onChange={(e) => {
              setForm({ ...formData, [e.target.name]: e.target.value });
            }}
          />
        </Form.Item>
        <Form.List name="Answers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 12 }}>
                  <Form.Item
                    label={`Respuesta ${key + 1}`}
                    {...restField}
                    name={[name, `answer`]}
                    fieldKey={[fieldKey, "answer"]}
                    rules={[
                      { required: true, message: "Ingresa la respuesta" },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setAnswers({
                          ...answers,
                          [`respuesta${key + 1}`]: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    style={{ marginTop: "15px" }}
                    align="baseline"
                    onClick={() => {
                      remove(name);
                      removeAnswer(`respuesta${key + 1}`);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Agregar Respuesta
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {Object.keys(answers).length > 0 && (
          <>
            <Form.Item label="Respuesta Correcta">
              <Select
                defaultValue="Selecciona una respuesta"
                onChange={(e) => {
                  setForm({ ...formData, respuestaCorrecta: e });
                }}
                allowClear
              >
                {Object.keys(answers).map((answer, index) => (
                  <Select.Option key={index} value={answer}>
                    {answers[answer]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Agregar Pregunta
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default QuestionForm;
