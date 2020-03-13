import React from "react";
import DrawTools from "./DrawTools";
import ClearTool from "./ClearTool";
//import SnapConfig from "./Snap";

const Editor = () => {
  return (
    <div className="menu-context">
      <div className="dr-tool">
        <DrawTools />
        <ClearTool />
      </div>
      {/* <div className="options">
        <SnapConfig />       
      </div> */}
    </div>
  );
};

export default Editor;
