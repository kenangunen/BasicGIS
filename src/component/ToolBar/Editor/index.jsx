import React from "react";
import AdvancedTools from "./AdvancedTools";
import DrawTools from "./DrawTools";
import "./editor.scss";
import EditTools from "./EditTools";
const Editor = () => {
  return (
    <div className="tool-content">
      <DrawTools />
      <EditTools />
      <AdvancedTools />
    </div>
  );
};

export default Editor;
