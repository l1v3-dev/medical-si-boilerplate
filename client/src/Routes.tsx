import { FC } from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import App from "./App";

interface IRouteProps {}

const Routes: FC<IRouteProps> = (props) => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<App />} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
