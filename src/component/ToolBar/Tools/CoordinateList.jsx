import React, { useState } from "react";
import ToolbarModel from "../../../Models/Toolbar";
const CoordinateList = () => {
  const [isVis, setVis] = useState(false);
  const showWin = () => {
    isVis
      ? ToolbarModel.handleCoordinateWinStatus(false)
      : ToolbarModel.handleCoordinateWinStatus(true);

    isVis ? setVis(false) : setVis(true);
  };
  return (
    <div className="dropdown">
      <button type="button" className="dropbtn" onClick={() => showWin()}>
        <span className="main-icon">
          <i className="fas fa-table"></i>
        </span>
        <span className="main-caption">Koordinat Listesi</span>
      </button>
    </div>
  );
};

export default CoordinateList;
