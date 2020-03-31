import React, { Fragment } from "react";
import DrawInteraction from "./Draw";
import DragDropVector from "./DragDropVector";
import SnapConfig from "./Snap";
import ModifyConfig from "./Modify";
import TranslateConfig from "./Translate";

function Interactions() {
  return (
    <Fragment>
      <DrawInteraction />
      <DragDropVector />
      <SnapConfig />
      <ModifyConfig />
      <TranslateConfig />
    </Fragment>
  );
}

export default Interactions;
