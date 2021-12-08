import React, { useEffect, useState } from "react";
import { getResults } from "../../../api/evaluador";
import { Typography, List, Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import moment from "moment";
import "./ResultsList.scss";
function ResultsList() {
  const [results, setResults] = useState([]);
  const { Title } = Typography;
  useEffect(() => {
    getResults().then((result) => {
      if (result.error) setResults([]);
      else setResults(result);
    });
  }, []);

  return (
    <div className="ResultsList">
      <Title level={2}>Resultados de tus Evaluados</Title>
      {results.length > 0 ? (
        <>
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
                      userName={`${result.Eva_nombre} ${result.Eva_apellido_paterno} ${result.Eva_apellido_materno}`}
                      score={result.Resultados_calificacion}
                      groupName={result.Gr_nombre}
                      date={result.Resultados_fecha_de_realizacion}
                    />
                  }
                />
              </List.Item>
            )}
          />
        </>
      ) : (
        <>
          <Result
            icon={<SmileOutlined />}
            title="Tus evaluados aún no han resuelto sus pruebas"
            subTitle="Los resultados de tus evaluados se mostraran en esta página"
            extra={
              <Button
                type="primary"
                onClick={() => window.location.replace("/evaluador/questions")}
              >
                Regresar
              </Button>
            }
          />
        </>
      )}
    </div>
  );
}

function Description(props) {
  const { groupName, date, score, userName } = props;

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
        El evaluado {userName} respondio el{" "}
        <span className={`w3-text-${color(score)}`}>{score}%</span> de las
        preguntas de manera correcta{" "}
      </h5>
    </div>
  );
}

export default ResultsList;