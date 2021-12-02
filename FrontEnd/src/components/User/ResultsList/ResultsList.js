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
              title={<h5>{result.Exa_nombre}</h5>}
              description={
                <Description
                  score={result.Resultados_calificacion}
                  groupName={result.Gr_nombre}
                  date={result.Resultados_fecha_de_realizacion}
                />
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

function Description(props) {
  const { groupName, date, score } = props;

  const color = (result) => {
    if (result >= 70) return "green";
    else if (result < 70 && result >= 60) return "yellow";

    return "red";
  };

  return (
    <div>
      <h5 className="w3-text-gray">{groupName}</h5>
      <h5 className="w3-text-gray">
        Fecha de realizacion: {moment(date).format()}
      </h5>

      <h5 className="w3-text-gray">
        Respondiste el{" "}
        <span className={`w3-text-${color(score)}`}>{score}%</span> de las
        preguntas de manera correcta{" "}
      </h5>
    </div>
  );
}

export default ResultsList;
