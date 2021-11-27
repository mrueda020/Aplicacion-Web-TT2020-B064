import React, { useEffect, useState } from "react";
import { getResults } from "../../../api/evaluado";
import { Typography, List, Progress } from "antd";
import moment from "moment";
import "./ResultsList.scss";
function ResultsList() {
  const [results, setResults] = useState([]);
  const { Title } = Typography;
  useEffect(() => {
    getResults().then((result) => {
      if (result) setResults(result);
    });
  }, []);

  const color = (result) => {
    if (result >= 70) return "green";
    else if (result < 70 && result >= 60) return "yellow";

    return "red";
  };

  return (
    <div className="ResultsList">
      <Title level={2}>Resultados</Title>
      <List
        pagination
        itemLayout="horizontal"
        dataSource={results}
        renderItem={(result) => (
          <List.Item>
            <List.Item.Meta
              title={result.Exa_nombre}
              description={
                <Description
                  groupName={result.Gr_nombre}
                  date={result.Resultados_fecha_de_realizacion}
                />
              }
            />
            <Progress
              type="circle"
              width={80}
              percent={result.Resultados_calificacion}
              strokeColor={color(result.Resultados_calificacion)}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

function Description(props) {
  const { groupName, date } = props;
  return (
    <div>
      {groupName}
      <br></br>
      Fecha de realizacion {moment(date).format()}
    </div>
  );
}

export default ResultsList;
