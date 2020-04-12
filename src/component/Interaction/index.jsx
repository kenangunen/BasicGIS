import React, { Fragment } from "react";
import DrawInteraction from "./Draw";
import DragDropVector from "./DragDropVector";
import SnapConfig from "./Snap";
import ModifyConfig from "./Modify";
import TranslateConfig from "./Translate";
import SelectConfig from "./Select";


function Interactions() {
  return (
    <Fragment>
      <DrawInteraction />
      <DragDropVector />
      <SnapConfig />
      <ModifyConfig />
      <TranslateConfig /> 
      <SelectConfig />   
    </Fragment>
  );
}

export default Interactions;
