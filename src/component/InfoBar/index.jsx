import React from "react";
import "./style.scss";

const InfoBar = props => {
  const { message } = props;
  return (
    <div className="info-bar">
      <div className="event-status">
        <p>{message}</p>
      </div>
      <div className="other"></div>
    </div>
  );
};

export default InfoBar;
