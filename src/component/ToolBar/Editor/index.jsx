import React from "react";
import DrawTools from "./DrawTools";
import ClearTool from "./ClearTool";
import SnapTool from "./SnapTool";

const Editor = () => {
  return (
    <div className="menu-context">
      <div className="dr-tool">
        <DrawTools />
        <ClearTool />
      </div>
      <div className="options">
        <SnapTool />       
      </div>
    </div>
  );
};

export default Editor;
