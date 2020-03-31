import React from "react";
import ToolOption from "./Options";
import DrawTools from "./DrawTools";
import "./editor.scss";

const Editor = () => {
  return (
    <div className="menu-context">
      <DrawTools />
      <ToolOption />
    </div>
  );
};

export default Editor;
