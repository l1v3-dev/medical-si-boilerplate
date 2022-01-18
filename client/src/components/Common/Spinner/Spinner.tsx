import React, { FC } from "react";
import "./Spinner.css";

const Spinner: FC = () => {
  return (
    <div className="spinner" id="double_bounce">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Spinner;
