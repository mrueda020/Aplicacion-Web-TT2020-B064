import React, { useEffect } from "react";
import { getGroups } from "../../../../api/evaluado";
function Settings() {
  useEffect(() => {
    console.log("Here");
    getGroups().then((result) => {
      console.log(result);
    });
  }, []);

  return <div>Estamos en configuracion</div>;
}

export default Settings;
