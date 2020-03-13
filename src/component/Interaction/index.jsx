import React, { Fragment } from "react";
import DrawInteraction from "./Draw";
import DragDropVector from "./DragDropVector";
import Clear from "./Clear";

function Interactions() {
  return (
    <Fragment>
      <DrawInteraction />
      <DragDropVector />
      <Clear />
    </Fragment>
  );
}

export default Interactions;
