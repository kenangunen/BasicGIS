import React, { Fragment } from "react";
import CoordinateList from "./CoordinateList";
import SwipeTool from "./SwipeTool";
import "./toolsStyle.scss"
import LegendTool from "./LegendTool";
const Tools = () => {
  return (
    <Fragment>
      <CoordinateList />
      <SwipeTool />
      <LegendTool />
    </Fragment>
  )
};

export default Tools;
