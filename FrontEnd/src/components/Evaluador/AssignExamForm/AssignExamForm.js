import React, { useEffect, useState } from "react";
import {
  Transfer,
  Typography,
  Select,
  Form,
  Button,
  notification,
  Tag,
} from "antd";
import { getExams, getGroups } from "../../../api/evaluador";
import { assignExams } from "../../../api/evaluador";
import "./AssignExamForm.scss";

function AssignExamForm({
  confirmReloading,
  setConfirmReloading,
  confirmReloadingGroups,
  setConfirmReloadingGroups,
}) {
  const { Title } = Typography;

  const [exams, setExams] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [options, setOptions] = useState([]);

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

  useEffect(() => {
    getExams().then((result) => {
      if (result.data) setExams(result.data);
    });
    setConfirmReloading(false);
  }, [confirmReloading]);

  useEffect(() => {
    getGroups().then((result) => {
      if (result.data) setGroups(result.data);
    });
    setConfirmReloadingGroups(false);
  }, [confirmReloadingGroups]);

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

  const onFinish = async () => {
    let payload = {};
    let groupdIds = selectedGroups.map((g) => {
      return g.value;
    });
    payload.groupIds = groupdIds;
    payload.examsIds = targetKeys;
    if (groupdIds.length === 0) {
      notification["error"]({ message: "Selecione los grupos" });
      return;
    }

    const response = await assignExams(payload);
    const result = await response.json();
    notification["success"]({ message: result.data });
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="AssignExamForm">
      <Title level={2}>Asignar Examenes</Title>
      <Transfer
        selectAllLabels={[
          ({ selectedCount, totalCount }) => (
            <span>
              {selectedCount} de {totalCount} examenes
            </span>
          ),
          ({ selectedCount, totalCount }) => (
            <span>{selectedCount} examenes</span>
          ),
        ]}
        listStyle={{
          width: 350,
          height: 550,
        }}
        rowKey={(record) => record.Exa_id}
        dataSource={exams}
        targetKeys={targetKeys}
        pagination
        showSearch
        oneWay
        render={(item) => {
          return `${item.Exa_nombre} - ${truncate(item.Exa_description, 25)}`;
        }}
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

export default AssignExamForm;
