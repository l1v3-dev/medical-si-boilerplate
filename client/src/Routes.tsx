import { FC } from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import App from "./App";
import Users from "./pages/Home/Users";

interface IRouteProps {}

const Routes: FC<IRouteProps> = (props) => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<Users dense={true} />} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
