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
    <button type="button" className="tools-big-btn" onClick={() => showWin()}>
      <span>
        <img src={coorList} alt="Add Service"/>
      </span>
      <span className="main-caption">Koordinat</span>
    </button>
  );
};

export default CoordinateList;
