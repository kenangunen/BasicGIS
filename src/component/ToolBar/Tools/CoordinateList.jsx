import React, { useState } from "react";
import ToolbarModel from "../../../Models/Toolbar";
import coorList from "../../../img/icon/coorList.svg";

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
      <button type="button" className="big-btn" onClick={() => showWin()}>
        <span>
          <img src={coorList} alt="Add Service" id="true" />
        </span>
        <span className="main-caption">Koordinat</span>
      </button>
    </div>
  );
};

export default CoordinateList;
