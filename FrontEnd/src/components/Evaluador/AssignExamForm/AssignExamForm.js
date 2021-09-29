import React, { useEffect, useState } from "react";
import { Transfer, Typography, Select, Form, Button } from "antd";
import { getExams, getGroups } from "../../../api/evaluador";
import "./AssignExamForm.scss";

function AssignExamForm() {
  const { Title } = Typography;

  const [exams, setExams] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getExams().then((result) => {
      if (result.data.length) setExams(result.data);
    });
  }, []);

  useEffect(() => {
    getGroups().then((result) => {
      if (result.data.length) setGroups(result.data);
    });
  }, []);

  useEffect(() => {
    let options = groups.map((g) => {
      const group = {
        value: g.Gr_id,
        label: g.Gr_nombre,
      };
      return group;
    });
    setOptions(options);
  }, [groups]);

  const onChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const handleChange = (selectedItems) => {
    setSelectedGroups(selectedItems);
  };

  const onFinish = () => {
    console.log("Here");
  };

  return (
    <div className="AssignExamForm">
      <Title level={2}>Asignar Examenes</Title>
      <Transfer
        rowKey={(record) => record.Exa_id}
        dataSource={exams}
        targetKeys={targetKeys}
        pagination
        showSearch
        oneWay
        render={(item) => item.Exa_nombre}
        onChange={onChange}
      />

      {targetKeys.length > 0 && (
        <Form onFinish={onFinish}>
          <Form.Item>
            <Select
              mode="multiple"
              placeholder="Selecciona el grupo"
              value={selectedGroups}
              onChange={handleChange}
              options={options}
              style={{ width: "100%", marginTop: "2em" }}
              optionFilterProp="label"
              labelInValue
            ></Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Asignar Examen
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
function ExamDescription(props) {
  const { item } = props;
  return (
    <>
      <table class="w3-table-all w3-hoverable">
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
        </tr>
      </table>
    </>
  );
}

export default AssignExamForm;
