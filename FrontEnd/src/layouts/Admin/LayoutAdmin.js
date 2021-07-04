import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../../pages/Admin/SignIn/SignIn";
function LayoutAdmin(props) {
  const { routes } = props;
  const user = null;
  if (!user) {
    return (
      <>
        <Route path="/admin/login" component={SignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  return (
    <div>
      <h1>Administrador</h1>
    </div>
  );
}

export default LayoutAdmin;
