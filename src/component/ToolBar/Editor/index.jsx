import React, { Fragment } from "react";
import ToolOption from "./Options";
import DrawTools from "./DrawTools";
import "./editor.scss";
const Editor = () => {
  return (
    <Fragment>
      <DrawTools />
      <ToolOption />
    </Fragment>
  );
};

export default Editor;
