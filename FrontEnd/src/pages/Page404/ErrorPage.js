import { Result, Button } from "antd";
import { AuthContext } from "../../provider/AuthProvider";
import React, { useContext } from "react";

function ErrorPage() {
  const { user, isLoading } = useContext(AuthContext);
  const goHome = () => {
    if (user && user.rol === "evaluado") {
      window.location.replace("/user");
    }
    if (user && user.rol === "evaluador") {
      window.location.replace("/evaluador");
    }
  };

  return (
    <div>
      <Result
        status="404"
        title="No existe la pagina"
        extra={
          <Button type="primary" onClick={goHome}>
            Regresar
          </Button>
        }
      />
      ,
    </div>
  );
}

export default ErrorPage;
