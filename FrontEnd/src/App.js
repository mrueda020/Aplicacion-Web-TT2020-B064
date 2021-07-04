import React from "react";
import routes from "./config/routes";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return (
              <RouteWithSubRoutes key={index} {...route}></RouteWithSubRoutes>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}
export default App;
