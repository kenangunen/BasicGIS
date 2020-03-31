import React, { useRef } from "react";
import ToolbarModel from "../../../Models/Toolbar";

const DrawTools = () => {
  const clr = useRef();

  const callDrawTools = e => {
    e.stopPropagation();
    const toolType = e.target.title;
    ToolbarModel.handleDrawType(toolType);
  };

  return (
    <div className="dr-tool">
      <div className="tools" onClick={e => callDrawTools(e)}>
        <button type="button" className="btn-tool" title="None">
          <i className="fas fa-mouse-pointer"></i>
        </button>
        <button type="button" className="btn-tool" title="Point">
          <i className="far fa-dot-circle"></i>
        </button>
        <button type="button" className="btn-tool" title="LineString">
          <i className="fas fa-bezier-curve"></i>
        </button>
        <button type="button" className="btn-tool" title="Polygon">
          <i className="fas fa-draw-polygon"></i>
        </button>
        <button type="button" className="btn-tool" title="Circle">
          <i className="far fa-circle"></i>
        </button>
        <button
          type="button"
          className="btn-status btn-tool"
          title="Clear"
          ref={clr}
        >
          <i className="fas fa-ban"></i>
        </button>
      </div>
    </div>
  );
};

export default DrawTools;
