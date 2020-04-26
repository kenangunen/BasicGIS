import React, { useRef } from "react";
import EditorModel from "../../../Models/Editor";
//#region SVG
import line from "../../../img/icon/line.svg";
import point from "../../../img//icon/point.svg";
import polygon from "../../../img//icon/polygon.svg";
import circle from "../../../img//icon/circle.svg";
import clear from "../../../img//icon/clear.svg";
import none from "../../../img//icon/none.svg";

//#endregion

const DrawTools = () => {
  const clr = useRef();

  const callDrawTools = (e) => {
    EditorModel.offSetSeymbology()
    e.stopPropagation();
    const node = e.target.nodeName;
    if (node === "BUTTON") {
      const toolType = e.target.title;
      EditorModel.handleDrawType(toolType);
      const buttons = document.querySelectorAll(".btn-tool")
      for (let btn of buttons) {
        btn.style.backgroundColor = "transparent";
      }

      if (toolType !== "Clear") {
        e.target.style.backgroundColor = "rgba(169, 169, 169, 0.5)";
      }
    }
  };

  return (
    <div className="tool-box" onClick={(e) => callDrawTools(e)}>
      <div className="tools">
        <button type="button" className="btn-tool" title="None">
          <img src={none} alt="Pointer" />
        </button>
        <button type="button" className="btn-tool" title="Point">
          <img src={point} alt="Point" />
        </button>
        <button type="button" className="btn-tool" title="LineString">
          <img src={line} alt="Line" />
        </button>
        <button type="button" className="btn-tool" title="Polygon">
          <img src={polygon} alt="Polygon" />
        </button>
        <button type="button" className="btn-tool" title="Circle">
          <img src={circle} alt="Circle" />
        </button>
        <button
          type="button"
          className="btn-status btn-tool"
          title="Clear"
          ref={clr}
        >
          <img src={clear} alt="Clear Logo" />
        </button>
      </div>
      <div className="toolHader">
        <span>Çizim Araçları</span>
      </div>
    </div>
  );
};

export default DrawTools;
