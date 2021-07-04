import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../../pages/Evaluador/SignIn/SignIn";
function LayoutEvaluador(props) {
  const { routes } = props;
  const user = null;
  if (!user) {
    return (
      <>
        <Route path="/evaluador/login" component={SignIn} />
        <Redirect to="/evaluador/login" />
      </>
    );
  }

  return (
    <div>
      <h1>Evaluador</h1>
    </div>
  );
}

export default LayoutEvaluador;
