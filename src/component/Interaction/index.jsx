import React, { Fragment } from "react";
import DrawInteraction from "./Draw";
import DragDropVector from "./DragDropVector";
import SelectConfig from "./Select";
import SnapConfig from './Snap'
import EditInteraction from "./Edit";


function Interactions() {
  return (
    <Fragment>
      <DrawInteraction />
      <DragDropVector />
      <SelectConfig />
      <SnapConfig />
      <EditInteraction />
    </Fragment>
  );
}

export default Interactions;
