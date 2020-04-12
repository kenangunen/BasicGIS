import React, { useRef } from "react";
import ToolbarModel from "../../../Models/Toolbar";
import line from "../../../img/icon/line.svg";
import point from "../../../img//icon/point.svg";
import polygon from "../../../img//icon/polygon.svg";
import circle from "../../../img//icon/circle.svg";
import clear from "../../../img//icon/clear.svg";
import none from "../../../img//icon/none.svg";

const DrawTools = () => {
  const clr = useRef();

  const callDrawTools = (e) => {
    e.stopPropagation();
    const node = e.target.nodeName;
    if (node === "BUTTON") {
      const toolType = e.target.title;
      ToolbarModel.handleDrawType(toolType);

      const buttons = e.target.parentElement.children;
      for (let btn of buttons) {
        btn.style.backgroundColor = "transparent";       
      }

      if (toolType !== "Clear") {
        e.target.style.backgroundColor = "rgba(169, 169, 169, 0.5)";      
       
      }
    }
  };

  return (
    <div className="draw-tools-content" onClick={(e) => callDrawTools(e)}>
      <div className="tools">
        <button type="button" className="btn-tool" title="None">
          <img src={none} alt="Pointer Logo" />
        </button>
        <button type="button" className="btn-tool" title="Point">
          <img src={point} alt="Point Logo" />
        </button>
        <button type="button" className="btn-tool" title="LineString">
          <img src={line} alt="Line Logo" />
        </button>
        <button type="button" className="btn-tool" title="Polygon">
          <img src={polygon} alt="Polygon Logo" />
        </button>
        <button type="button" className="btn-tool" title="Circle">
          <img src={circle} alt="Circle Logo" />
        </button>
        <button
          type="button"
          className="btn-status btn-tool"
          title="Clear"
          ref={clr}
        >
          <img src={clear} alt="Circle Logo" />
        </button>
      </div>
      <div className="toolHader">
        <span>Çizim Araçları</span>
      </div>
    </div>
  );
};

export default DrawTools;
