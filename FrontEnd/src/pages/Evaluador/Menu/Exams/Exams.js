import React from "react";
import { Tabs } from "antd";
import ExamsForm from "../../../../components/Evaluador/ExamsForm/ExamsForm";
import "./Exams.scss";
import GroupForm from "../../../../components/Evaluador/GroupForm/GroupForm";
import AssignExamForm from "../../../../components/Evaluador/AssignExamForm/AssignExamForm";
function Exams() {
  const { TabPane } = Tabs;
  return (
    <div className="Exams">
      <Tabs animated size="large">
        <TabPane tab="Crear Examen" key="1">
          <div className="Exams__form">
            <ExamsForm />
          </div>
        </TabPane>
        <TabPane tab="Grupos" key="2">
          <div className="Exams__form">
            <GroupForm />
          </div>
        </TabPane>
        <TabPane tab="Asignar Examenes" key="3">
          <div className="Exams__form">
            <AssignExamForm />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Exams;
