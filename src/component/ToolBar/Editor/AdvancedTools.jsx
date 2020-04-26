import React, { useRef, useEffect, useState } from "react";
import ToolbarModel from "../../../Models/Toolbar";
import EditorModel from "../../../Models/Editor";

const AdvancedTools = () => {
  EditorModel.offSetSeymbology()
  const [snapInt, setSnapInt] = useState();
  const [freehandInt, setfreeHandInt] = useState();
  const opt = useRef();
  //#region getInteraciton
  useEffect(() => {
    const getInteraction = (isIntActive) => {
      setSnapInt(isIntActive);
    };
    ToolbarModel.on("onSnapActive", getInteraction);
    return () => {
      ToolbarModel.off("onSnapActive", getInteraction);
    };
  }, [snapInt]);


  useEffect(() => {
    const getInteraction = (isIntActive) => {
      setfreeHandInt(isIntActive);
    };
    ToolbarModel.on("onFreehandActive", getInteraction);
    return () => {
      ToolbarModel.off("onFreehandActive", getInteraction);
    };
  }, [freehandInt]);
  //#endregion


  const onChange = (e) => {
    const isActive = e.target.checked
    const val = e.target.value;
    if (val === "snap") {
      ToolbarModel.isSnapChecked(isActive);
    } else if (val === "freehand") {
      ToolbarModel.isFreehandChecked(isActive);
    }
  };

  return (
    <div className="advancedTool-content" ref={opt}>
      <div className="adv-tools">
        <div className="pretty p-default p-curve p-thick p-smooth">
          {snapInt ? (
            <input id="snap" type="checkbox" value="snap" onChange={(e) => onChange(e)} />
          ) : (
              <input
                type="checkbox"
                value="snap"
                disabled
                onChange={(e) => onChange(e)}
              />
            )}

          <div className="state p-info-o">
            <label>Snap</label>
          </div>
        </div>

        <div className="pretty p-default p-curve p-thick p-smooth">
          {freehandInt ? (
            <input
              className="freehandInt"
              type="checkbox"
              id="freehand"
              value="freehand"
              onChange={(e) => onChange(e)}
            />
          ) : (
              <input
                type="checkbox"
                value="freehand"
                disabled
                onChange={(e) => onChange(e)}
              />
            )}

          <div className="state p-info-o">
            <label>Freehand</label>
          </div>
        </div>
      </div>
      <div className="toolHader">
        <span>Gelişmiş Çizim Araçları</span>
      </div>
    </div>
  );
};

export default AdvancedTools;
